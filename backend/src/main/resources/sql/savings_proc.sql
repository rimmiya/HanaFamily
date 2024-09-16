/*
 * 적금 해지 처리 프로시저
 * - TB_SAVING_PRODUCT 테이블에서 SAVING_STATUS가 'GOAL_ACHIEVED'이고, 시작일로부터 3개월이 지난 적금 상품을 해지 처리
 * - 해지 처리 시, 이자 및 원금 지급 및 TB_SAVINGS_TRANSACTION 테이블에 출금 내역 기록
 */
CREATE OR REPLACE PROCEDURE PROC_AUTO_TERMINATION AS
    CURSOR cur_products IS
        SELECT SAVING_ACCOUNT_NO, USER_NO, CURRENT_AMOUNT, INTEREST_RATE, BONUS_INTEREST_RATE, START_DATE
        FROM TB_SAVING_PRODUCT
        WHERE SAVING_STATUS = 'GOAL_ACHIEVED'
          AND START_DATE + INTERVAL '3' MONTH <= SYSDATE;

    v_interest NUMBER(15, 2);
BEGIN
    FOR rec IN cur_products LOOP
            -- 이자 계산 로직 (예시로 단순 계산)
            v_interest := rec.CURRENT_AMOUNT * (rec.INTEREST_RATE + rec.BONUS_INTEREST_RATE) *
                          MONTHS_BETWEEN(SYSDATE, rec.START_DATE) / 12;

            -- 해지 처리
            UPDATE TB_SAVING_PRODUCT
            SET SAVING_STATUS = 'TERMINATED',
                END_DATE = SYSDATE
            WHERE SAVING_ACCOUNT_NO = rec.SAVING_ACCOUNT_NO;

            -- 이자 및 원금 지급 처리 (실제 은행 시스템과의 연동 필요)
            DBMS_OUTPUT.PUT_LINE('적금 계좌 ' || rec.SAVING_ACCOUNT_NO || ' 해지 처리 완료. 원금: ' || rec.CURRENT_AMOUNT || ', 이자: ' || v_interest || ' 지급.');

            -- 지급 내역을 TRANSACTION 테이블에 기록 (출금 처리)
            INSERT INTO TB_SAVINGS_TRANSACTION (
                TRANSACTION_ID, SAVING_ACCOUNT_NO, USER_NO, AMOUNT, AFTER_AMOUNT, TRANSACTION_DATE, TRANSACTION_TYPE
            ) VALUES (
                         SEQ_TRANSACTION_ID.NEXTVAL, rec.SAVING_ACCOUNT_NO, rec.USER_NO, rec.CURRENT_AMOUNT * -1, 0, SYSDATE, 'WITHDRAWAL'
                     );
        END LOOP;
END;
/

/*
 * 적금 자동 이체 처리 프로시저
 * - TB_SAVINGS_PARTICIPATION 테이블에서 AUTO_TRANSFER_DATE가 오늘 날짜인 회원들에 대해 자동 이체 처리
 * - TB_SAVINGS_TRANSACTION 테이블에 입금 내역 기록
 */
CREATE OR REPLACE PROCEDURE PROC_AUTO_TRANSFER AS
    CURSOR cur_members IS
        SELECT SP.SAVING_ACCOUNT_NO, SP.USER_ID, SP.AUTO_TRANSFER_AMOUNT
        FROM TB_SAVINGS_PARTICIPATION SP
        WHERE SP.AUTO_TRANSFER_DATE = TO_NUMBER(TO_CHAR(SYSDATE, 'DD'));

BEGIN
    FOR rec IN cur_members LOOP
            -- 입금 처리
            INSERT INTO TB_SAVINGS_TRANSACTION (
                TRANSACTION_ID, SAVING_ACCOUNT_NO, USER_NO, AMOUNT, AFTER_AMOUNT, TRANSACTION_DATE, TRANSACTION_TYPE
            ) VALUES (
                         SEQ_TRANSACTION_ID.NEXTVAL, rec.SAVING_ACCOUNT_NO, rec.USER_ID, rec.AUTO_TRANSFER_AMOUNT, 0, SYSDATE, 'DEPOSIT'
                     );
        END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        -- 오류 처리 (예: 로그 기록)
        DBMS_OUTPUT.PUT_LINE('자동 이체 중 오류 발생: ' || SQLERRM);
END;
/

/*
 * 적금 자동 해지 및 자동 이체 Job 등록
 */
BEGIN
    DBMS_SCHEDULER.CREATE_JOB (
            JOB_NAME => 'JOB_AUTO_TERMINATION',
            JOB_TYPE => 'STORED_PROCEDURE',
            JOB_ACTION => 'PROC_AUTO_TERMINATION',
            START_DATE => TRUNC(SYSDATE) + 1,
            REPEAT_INTERVAL => 'FREQ=DAILY;INTERVAL=1',
            ENABLED => TRUE
    );
END;
/

/*
 * 적금 자동 이체 Job 등록
 */
BEGIN
    DBMS_SCHEDULER.CREATE_JOB (
            JOB_NAME => 'JOB_AUTO_TRANSFER',
            JOB_TYPE => 'STORED_PROCEDURE',
            JOB_ACTION => 'PROC_AUTO_TRANSFER',
            START_DATE => TRUNC(SYSDATE) + 1,
            REPEAT_INTERVAL => 'FREQ=DAILY;INTERVAL=1',
            ENABLED => TRUE
    );
END;
/
