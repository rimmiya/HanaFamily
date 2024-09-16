/*
 * Saving Product 테이블 생성을 위한 DDL
 * 상품 ID를 위한 시퀀스 생성
 */

-- SAVING_ACCOUNT_NO 생성을 위한 시퀀스 생성
CREATE SEQUENCE SEQ_SAVING_ACCOUNT_NO
    START WITH 1000000000  -- 시작 값 (필요에 따라 조정 가능)
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- SAVING_PRODUCT 테이블 생성
CREATE TABLE TB_SAVING_PRODUCT (
                                SAVING_ACCOUNT_NO VARCHAR2(20) PRIMARY KEY,
                                USER_NO INTEGER NOT NULL, -- 대표자 NO
                                GOAL_AMOUNT INTEGER NOT NULL,
                                CURRENT_AMOUNT INTEGER DEFAULT 0 NOT NULL,
                                START_DATE DATE DEFAULT SYSDATE NOT NULL,
                                END_DATE DATE,
                                INTEREST_RATE NUMBER(5, 4) DEFAULT 0 NOT NULL,
                                BONUS_INTEREST_RATE NUMBER(5, 4) DEFAULT 0 NOT NULL,
                                MIN_DURATION INTEGER DEFAULT 3 NOT NULL,
                                MAX_DURATION INTEGER NOT NULL,
                                SAVING_STATUS VARCHAR2(20) DEFAULT 'IN_PROGRESS' NOT NULL,
                                PRODUCT_ID INTEGER NOT NULL,
                                CONSTRAINT FK_SAVING_PRODUCT_CUSTOMER FOREIGN KEY (USER_NO)
                                    REFERENCES TB_USERS (USER_NO)
);

-- SAVING_ACCOUNT_NO 자동 생성을 위한 트리거 생성
CREATE OR REPLACE TRIGGER TRG_SAVING_ACCOUNT_NO
    BEFORE INSERT ON TB_SAVING_PRODUCT
    FOR EACH ROW
BEGIN
    IF :NEW.SAVING_ACCOUNT_NO IS NULL THEN
        :NEW.SAVING_ACCOUNT_NO := TO_CHAR(SEQ_SAVING_ACCOUNT_NO.NEXTVAL);
    END IF;
END;
/

/*
 * Family Member 테이블 생성을 위한 DDL
 * 가족 구성원 ID를 위한 시퀀스 생성
 */

-- SAVINGS_PARTICIPATION 테이블 생성
CREATE TABLE TB_SAVINGS_PARTICIPATION (
                                       SAVING_ACCOUNT_NO       VARCHAR2(20)  NOT NULL,               -- 적금 계좌 번호
                                       USER_ID                 INTEGER       NOT NULL,               -- 사용자 ID (TB_USERS.USER_NO 참조)
                                       FAMILY_ID               INTEGER       NOT NULL,               -- 가족 ID (TB_FAMILY.FAMILY_ID 참조)
                                       START_DATE              DATE          DEFAULT SYSDATE NOT NULL, -- 참여 시작일
                                       TOTAL_AMOUNT            INTEGER       DEFAULT 0 NOT NULL,     -- 총 납입 금액
                                       AUTO_TRANSFER_DATE      NUMBER(2),                            -- 자동이체일
                                       AUTO_TRANSFER_AMOUNT    INTEGER,                              -- 자동이체 금액
                                       AUTO_TRANSFER_SMS_YN    VARCHAR2(1)   DEFAULT 'N' NOT NULL,   -- 자동이체 SMS 알림 여부 ('Y' 또는 'N')
                                       MATURITY_SMS_YN         VARCHAR2(1)   DEFAULT 'N' NOT NULL,   -- 적금 만기 SMS 알림 여부 ('Y' 또는 'N')
                                       CONSTRAINT PK_SAVINGS_PARTICIPATION PRIMARY KEY (SAVING_ACCOUNT_NO, USER_ID),
                                       CONSTRAINT FK_SAV_PARTICIPATION_USER FOREIGN KEY (USER_ID)
                                           REFERENCES TB_USERS (USER_NO),
                                       CONSTRAINT FK_SAV_PARTICIPATION_FAMILY FOREIGN KEY (FAMILY_ID)
                                           REFERENCES TB_FAMILY (FAMILY_ID),
                                       CONSTRAINT FK_SAV_PARTICIPATION_SAVING_ACCOUNT FOREIGN KEY (SAVING_ACCOUNT_NO)
                                           REFERENCES TB_SAVING_PRODUCT (SAVING_ACCOUNT_NO)
);


/*
 * Transaction 테이블 생성을 위한 DDL
 * 거래 ID를 위한 시퀀스 생성
 */

-- 거래 ID를 위한 시퀀스 생성
CREATE SEQUENCE SEQ_TRANSACTION_ID
    START WITH 1
    INCREMENT BY 1
    NOCACHE
NOCYCLE;

-- TRANSACTION 테이블 생성
CREATE TABLE TB_SAVINGS_TRANSACTION (
                             TRANSACTION_ID INTEGER PRIMARY KEY,
                             SAVING_ACCOUNT_NO VARCHAR2(20) NOT NULL,
                             USER_NO INTEGER NOT NULL,
                             AMOUNT INTEGER NOT NULL,
                             AFTER_AMOUNT INTEGER NOT NULL,
                             TRANSACTION_DATE DATE DEFAULT SYSDATE NOT NULL,
                             TRANSACTION_TYPE VARCHAR2(20) NOT NULL,
                             CONSTRAINT FK_TRANSACTION_PRODUCT FOREIGN KEY (SAVING_ACCOUNT_NO)
                                 REFERENCES TB_SAVING_PRODUCT (SAVING_ACCOUNT_NO),
                             CONSTRAINT FK_TRANSACTION_CUSTOMER FOREIGN KEY (USER_NO)
                                 REFERENCES TB_USERS (USER_NO)
);

-- TRANSACTION_ID 자동 증가를 위한 트리거 생성
CREATE OR REPLACE TRIGGER TRG_TRANSACTION_ID
BEFORE INSERT ON TB_SAVINGS_TRANSACTION
FOR EACH ROW
BEGIN
    :NEW.TRANSACTION_ID := SEQ_TRANSACTION_ID.NEXTVAL;
END;
/

-- PRODUCT_ID를 위한 시퀀스 생성
CREATE SEQUENCE SEQ_PRODUCT_ID
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- TB_PRODUCT 테이블 생성
CREATE TABLE TB_PRODUCT (
                            PRODUCT_ID              INTEGER        PRIMARY KEY,          -- 상품 번호
                            PRODUCT_NAME            VARCHAR2(100)  NOT NULL,             -- 상품명
                            BASE_INTEREST_RATE      NUMBER(5, 4)   NOT NULL,             -- 기본 금리
                            BONUS_INTEREST_RATE     NUMBER(5, 4)   DEFAULT 0 NOT NULL,   -- 우대 금리
                            MIN_DURATION            INTEGER        NOT NULL,             -- 최소 가입 기간 (월 단위)
                            MAX_DURATION            INTEGER        NOT NULL,             -- 최대 가입 기간 (월 단위)
                            MIN_DEPOSIT             INTEGER        NOT NULL,             -- 최소 가입 금액
                            MAX_DEPOSIT             INTEGER        NOT NULL,             -- 최대 가입 금액
                            MAX_MONTHLY_DEPOSIT     INTEGER        NOT NULL,             -- 월 최대 납입금
                            PRODUCT_DESCRIPTION     VARCHAR2(500),                       -- 상품 설명
                            CREATED_DATE            DATE           DEFAULT SYSDATE NOT NULL, -- 생성일
                            UPDATED_DATE            DATE                                      -- 수정일
);

-- PRODUCT_ID 자동 증가를 위한 트리거 생성
CREATE OR REPLACE TRIGGER TRG_PRODUCT_ID
    BEFORE INSERT ON TB_PRODUCT
    FOR EACH ROW
BEGIN
    IF :NEW.PRODUCT_ID IS NULL THEN
        SELECT SEQ_PRODUCT_ID.NEXTVAL INTO :NEW.PRODUCT_ID FROM dual;
    END IF;
    :NEW.CREATED_DATE := SYSDATE; -- 생성일 자동 설정
END;
/

-- 기존의 TB_SAVING_PRODUCT 테이블에 외래 키 추가
ALTER TABLE TB_SAVING_PRODUCT
    ADD CONSTRAINT FK_SAVING_PRODUCT_PRODUCT FOREIGN KEY (PRODUCT_ID)
        REFERENCES TB_PRODUCT (PRODUCT_ID);


ALTER TABLE TB_SAVINGS_PARTICIPATION ADD (
    SUCCESSFUL_TRANSFERS NUMBER DEFAULT 0,
    BONUS_APPLIED VARCHAR2(1) DEFAULT 'N'
    );

ALTER TABLE TB_SAVINGS_PARTICIPATION ADD (
    USER_ACCOUNT_NO VARCHAR2(20)
    );

ALTER TABLE TB_SAVING_PRODUCT ADD (
    REPRESENTATIVE_ACCOUNT_NO VARCHAR2(20)
    );

CREATE TABLE TB_SAVINGS_INVITATION (
                                    INVITATION_ID INTEGER PRIMARY KEY,
                                    SAVING_ACCOUNT_NO VARCHAR2(20) NOT NULL,
                                    INVITER_USER_NO INTEGER NOT NULL,
                                    INVITEE_USER_NO INTEGER NOT NULL,
                                    INVITATION_DATE DATE DEFAULT SYSDATE,
                                    STATUS VARCHAR2(20) DEFAULT 'PENDING',
                                    FOREIGN KEY (SAVING_ACCOUNT_NO) REFERENCES TB_SAVING_PRODUCT(SAVING_ACCOUNT_NO),
                                    FOREIGN KEY (INVITER_USER_NO) REFERENCES TB_USERS(USER_NO),
                                    FOREIGN KEY (INVITEE_USER_NO) REFERENCES TB_USERS(USER_NO)
);

CREATE SEQUENCE SAVINGS_INVITATION_SEQ
    START WITH 1
    INCREMENT BY 1
    NOCACHE;