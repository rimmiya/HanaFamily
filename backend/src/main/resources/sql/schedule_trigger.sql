CREATE OR REPLACE TRIGGER trg_schedule_insert
AFTER INSERT ON TB_SCHEDULE
FOR EACH ROW
BEGIN
UPDATE TB_BUDGET
SET EVENT_AMOUNT = EVENT_AMOUNT + :NEW.BUDGET
WHERE FAMILY_ID = :NEW.FAMILY_ID
  AND CATEGORY_ID = :NEW.CATEGORY_ID;
END;
/

CREATE OR REPLACE TRIGGER trg_schedule_update
    AFTER UPDATE ON TB_SCHEDULE
    FOR EACH ROW
BEGIN
    IF :NEW.BUDGET != :OLD.BUDGET THEN
        -- Subtract old budget and add new budget
        UPDATE TB_BUDGET
        SET EVENT_AMOUNT = EVENT_AMOUNT - :OLD.BUDGET + :NEW.BUDGET
        WHERE FAMILY_ID = :NEW.FAMILY_ID
          AND CATEGORY_ID = :NEW.CATEGORY_ID;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_schedule_delete
    BEFORE DELETE ON TB_SCHEDULE
    FOR EACH ROW
BEGIN
    UPDATE TB_BUDGET
    SET EVENT_AMOUNT = EVENT_AMOUNT - :OLD.BUDGET
    WHERE FAMILY_ID = :OLD.FAMILY_ID
      AND CATEGORY_ID = :OLD.CATEGORY_ID;
END;
/

CREATE OR REPLACE TRIGGER trg_schedule_end
    AFTER UPDATE OF END_DATE ON TB_SCHEDULE
    FOR EACH ROW
BEGIN
    IF :NEW.END_DATE < SYSDATE THEN
        UPDATE TB_BUDGET
        SET EVENT_AMOUNT = EVENT_AMOUNT - :NEW.BUDGET
        WHERE FAMILY_ID = :NEW.FAMILY_ID
          AND CATEGORY_ID = :NEW.CATEGORY_ID;
    END IF;
END;
/

BEGIN
    DBMS_SCHEDULER.create_job (
            job_name        => 'UPDATE_BUDGET_AFTER_END_DATE',
            job_type        => 'PLSQL_BLOCK',
            job_action      => '
            BEGIN
                UPDATE TB_BUDGET B
                SET B.EVENT_AMOUNT = B.EVENT_AMOUNT -
                    (SELECT S.BUDGET FROM TB_SCHEDULE S
                     WHERE S.FAMILY_ID = B.FAMILY_ID
                     AND S.CATEGORY_ID = B.CATEGORY_ID
                     AND S.END_DATE < SYSDATE);
            END;',
            start_date      => SYSTIMESTAMP,
            repeat_interval => 'FREQ=DAILY; BYHOUR=0; BYMINUTE=0; BYSECOND=0',
            enabled         => TRUE
    );
END;
/

DROP TRIGGER trg_schedule_insert;
DROP TRIGGER trg_schedule_update;
DROP TRIGGER trg_schedule_delete;
DROP TRIGGER trg_schedule_end;

commit;

BEGIN
    DBMS_SCHEDULER.drop_job (
            job_name => 'UPDATE_BUDGET_AFTER_END_DATE',
            force    => TRUE  -- 작업이 실행 중이더라도 강제로 삭제할 수 있습니다
    );
END;
/