/*
 * 월 최대 납입금(1,000,000원)을 초과하는 경우에 대한 트리거
 */
CREATE OR REPLACE TRIGGER TRG_TRANSACTION_MONTHLY_LIMIT
    BEFORE INSERT ON TB_SAVINGS_TRANSACTION
    FOR EACH ROW
DECLARE
    v_total_amount NUMBER(15, 2);
BEGIN
    -- 입금인 경우에만 체크
    IF :NEW.TRANSACTION_TYPE = 'DEPOSIT' THEN
        SELECT NVL(SUM(AMOUNT), 0)
        INTO v_total_amount
        FROM TB_SAVINGS_TRANSACTION
        WHERE SAVING_ACCOUNT_NO = :NEW.SAVING_ACCOUNT_NO
          AND TRANSACTION_TYPE = 'DEPOSIT'
          AND TO_CHAR(TRANSACTION_DATE, 'YYYYMM') = TO_CHAR(SYSDATE, 'YYYYMM');

        IF (v_total_amount + :NEW.AMOUNT) > 1000000 THEN
            RAISE_APPLICATION_ERROR(-20001, '월 최대 납입금(1,000,000원)을 초과하였습니다.');
        END IF;
    END IF;
END;
/

/*
 * 적립 상품 목표 금액 초과 및 달성 시 상태 변경을 위한 트리거
 */
CREATE OR REPLACE TRIGGER TRG_SAVING_PRODUCT_GOAL_CHECK
    AFTER INSERT OR UPDATE ON TB_SAVINGS_TRANSACTION
    FOR EACH ROW
DECLARE
    v_current_amount NUMBER(15, 2);
    v_goal_amount NUMBER(15, 2);
    v_status VARCHAR2(20);
BEGIN
    -- 입금인 경우에만 처리
    IF :NEW.TRANSACTION_TYPE = 'DEPOSIT' THEN
        -- 현재 적립 금액 계산
        SELECT SUM(AMOUNT)
        INTO v_current_amount
        FROM TB_SAVINGS_TRANSACTION
        WHERE SAVING_ACCOUNT_NO = :NEW.SAVING_ACCOUNT_NO
          AND TRANSACTION_TYPE = 'DEPOSIT';

        -- 목표 금액 조회
        SELECT GOAL_AMOUNT, SAVING_STATUS
        INTO v_goal_amount, v_status
        FROM TB_SAVING_PRODUCT
        WHERE SAVING_ACCOUNT_NO = :NEW.SAVING_ACCOUNT_NO;

        -- 목표 금액 초과 여부 체크
        IF v_current_amount > v_goal_amount THEN
            RAISE_APPLICATION_ERROR(-20002, '목표 금액을 초과하여 입금할 수 없습니다.');
        END IF;

        -- SAVING_PRODUCT 테이블의 CURRENT_AMOUNT 및 STATUS 업데이트
        UPDATE TB_SAVING_PRODUCT
        SET CURRENT_AMOUNT = v_current_amount
        WHERE SAVING_ACCOUNT_NO = :NEW.SAVING_ACCOUNT_NO;

        -- 목표 금액 달성 시 STATUS 업데이트
        IF v_current_amount >= v_goal_amount AND v_status != 'GOAL_ACHIEVED' THEN
            UPDATE TB_SAVING_PRODUCT
            SET SAVING_STATUS = 'GOAL_ACHIEVED'
            WHERE SAVING_ACCOUNT_NO = :NEW.SAVING_ACCOUNT_NO;
        END IF;
    END IF;
END;
/

/*
 * 목표 금액 달성 상태에서 추가 입금을 막기 위한 트리거
 */
CREATE OR REPLACE TRIGGER TRG_SAVING_PRODUCT_NO_MORE_DEPOSIT
    BEFORE INSERT ON TB_SAVINGS_TRANSACTION
    FOR EACH ROW
DECLARE
    v_status VARCHAR2(20);
BEGIN
    -- 입금인 경우에만 처리
    IF :NEW.TRANSACTION_TYPE = 'DEPOSIT' THEN
        SELECT SAVING_STATUS
        INTO v_status
        FROM TB_SAVING_PRODUCT
        WHERE SAVING_ACCOUNT_NO = :NEW.SAVING_ACCOUNT_NO;

        IF v_status = 'GOAL_ACHIEVED' THEN
            RAISE_APPLICATION_ERROR(-20003, '목표 금액이 달성되어 추가 입금이 불가능합니다.');
        END IF;
    END IF;
END;
/
