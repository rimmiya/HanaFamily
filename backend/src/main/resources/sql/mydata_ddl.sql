CREATE TABLE tb_family (
                           family_id          Integer  PRIMARY KEY,      -- 가족 ID (기본키)
                           family_registration_date  DATE        DEFAULT SYSDATE,  -- 가족 등록일 (현재 날짜 기본값)
                           family_status             VARCHAR2(20) NOT NULL,        -- 상태 여부 (예: 'ACTIVE', 'INACTIVE')
                           family_inviter_no            Integer,                 -- 초대자
                           family_invitation_date    DATE,                         -- 초대일
                           family_invitation_code    VARCHAR2(50),                 -- 초대 코드
                           family_invitation_status  VARCHAR2(20),                 -- 초대 상태
                           family_relationship       VARCHAR2(50),                 -- 관계
                           family_invitee_no            Integer                  -- 수락자
);

CREATE SEQUENCE family_seq
    START WITH 1 -- 초기 값
    INCREMENT BY 1 -- 증가 값
    NOCACHE; -- 시퀀스 값 캐싱 안 함

CREATE OR REPLACE TRIGGER trg_tb_family_id
    BEFORE INSERT ON tb_family
    FOR EACH ROW
    WHEN (NEW.family_id IS NULL) -- family_id 값이 NULL일 때만 시퀀스 적용
BEGIN
    SELECT family_seq.NEXTVAL INTO :NEW.family_id FROM dual;
END;
/

DROP SEQUENCE family_seq;
DROP TRIGGER trg_tb_family_id;


-- ALTER TABLE tb_users drop constraint fk_users_family;

CREATE TABLE tb_users (
                          user_no         Integer PRIMARY KEY,  -- 사용자 번호 (기본키)
                          user_name       VARCHAR2(100) NOT NULL,    -- 사용자 이름
                          user_id         VARCHAR2(50) NOT NULL,     -- 사용자 아이디
                          user_pw         VARCHAR2(100) NOT NULL,    -- 사용자 비밀번호
                          user_gender     VARCHAR2(10),              -- 성별
                          user_email      VARCHAR2(100),             -- 이메일
                          user_phone_no   VARCHAR2(20),              -- 전화번호
                          user_address         VARCHAR2(200),             -- 주소
                          user_resident_id     VARCHAR2(14),              -- 주민등록번호
                          user_status     VARCHAR2(20),              -- 상태 (예: ACTIVE, INACTIVE)
                          user_birth      DATE,                      -- 생년월일
                          user_register_dt     DATE DEFAULT SYSDATE,      -- 등록일
                          user_modified_dt     DATE,                      -- 수정일
                          family_id       Integer,                -- 가족 ID (외래 키)

    -- 가족 ID가 tb_family 테이블을 참조하는 외래 키 설정
                          CONSTRAINT fk_users_family FOREIGN KEY (family_id) REFERENCES tb_family(family_id)
);


-- user_no에 대한 시퀀스
CREATE SEQUENCE user_no_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- family_id에 대한 시퀀스
CREATE SEQUENCE family_id_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

CREATE OR REPLACE TRIGGER trg_tb_members_user_no
    BEFORE INSERT ON tb_users
    FOR EACH ROW
BEGIN
    IF :NEW.user_no IS NULL THEN
SELECT user_no_seq.NEXTVAL INTO :NEW.user_no FROM dual;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_tb_family_family_id
    BEFORE INSERT ON tb_family
    FOR EACH ROW
BEGIN
    IF :NEW.family_id IS NULL THEN
SELECT family_id_seq.NEXTVAL INTO :NEW.family_id FROM dual;
END IF;
END;
/

CREATE TABLE tb_Account (
                            account_no        VARCHAR2(20) PRIMARY KEY,  -- 계좌 번호 (기본키)
                            user_no           Integer,                -- 사용자 번호 (외래키)
                            account_name      VARCHAR2(100),             -- 계좌 이름
                            account_password  NUMBER,                    -- 계좌 비밀번호
                            account_balance   NUMBER,                    -- 계좌 잔액
                            account_create_date       DATE,                      -- 계좌 생성일
                            account_status    NUMBER,                    -- 계좌 상태
                            bank_code         NUMBER,                    -- 은행 코드
                            account_type      NUMBER,                    -- 계좌 유형
                            account_limit     NUMBER,                    -- 계좌 한도
                            account_expire_date DATE                     -- 계좌 만료일
);

-- 외래 키 설정: user_no는 Users 테이블을 참조합니다.
ALTER TABLE tb_Account ADD CONSTRAINT FK_Account_User
    FOREIGN KEY (user_no) REFERENCES tb_Users(user_no);


-- CREATE UNIQUE INDEX Account_PK ON tb_Account (account_no);

-- ALTER TABLE tb_Account
--     ADD CONSTRAINT Account_PK PRIMARY KEY (account_no)
--         USING INDEX Account_PK;

-- ALTER TABLE tb_Account
--     ADD CONSTRAINT Account_FK FOREIGN KEY (user_no)
--         REFERENCES tb_users (user_no);

-- ALTER TABLE tb_Account
--     ADD CONSTRAINT Account_FK1 FOREIGN KEY (account_status)
--         REFERENCES CommonCode (code_id);
--
-- ALTER TABLE tb_Account
--     ADD CONSTRAINT Account_FK2 FOREIGN KEY (bank_code)
--         REFERENCES CommonCode (code_id);


CREATE TABLE tb_BankStatement (
                                  transaction_no     NUMBER PRIMARY KEY,       -- 거래 번호 (기본키)
                                  account_no         VARCHAR2(20),             -- 계좌 번호 (외래키)
                                  transaction_amount NUMBER,                   -- 거래 금액
                                  transaction_date   DATE,                     -- 거래 날짜
                                  transaction_type   VARCHAR2(50),             -- 거래 유형
                                  account_balance    NUMBER,                   -- 거래 후 계좌 잔액
                                  user_no            INTEGER,             -- 사용자 번호
                                  before_balance     NUMBER,                   -- 거래 전 계좌 잔액
                                  account_no_to      VARCHAR2(20)              -- 송금 시 상대방 계좌 번호
);

-- CREATE UNIQUE INDEX BankStatement_PK ON tb_BankStatement (transaction_no);

-- ALTER TABLE tb_BankStatement ADD CONSTRAINT BankStatement_PK PRIMARY KEY (transaction_no) USING INDEX BankStatement_PK;

ALTER TABLE tb_BankStatement ADD CONSTRAINT BankStatement_FK FOREIGN KEY (account_no) REFERENCES tb_Account (account_no);

-- ALTER TABLE tb_BankStatement ADD CONSTRAINT BankStatement_FK1 FOREIGN KEY (transaction_type) REFERENCES CommonCode (code_id);


CREATE TABLE tb_Card (
                         card_no           VARCHAR2(20) PRIMARY KEY,  -- 카드 번호 (기본키)
                         user_no           INTEGER,                -- 사용자 번호 (외래키)
                         card_passwd            NUMBER,                    -- 카드 비밀번호
                         card_period       DATE,                      -- 카드 유효 기간
                         card_cvc               VARCHAR2(3),               -- 카드 CVC
                         card_user         VARCHAR2(50),              -- 카드 사용자
                         card_name         VARCHAR2(100),             -- 카드 이름
                         card_type         VARCHAR2(50),              -- 카드 유형
                         card_limit        NUMBER,                    -- 카드 한도
                         card_code         NUMBER,                    -- 카드 코드
                         card_balance      NUMBER,                    -- 카드 잔액
                         card_product_code NUMBER                     -- 카드 상품 코드
);

-- CREATE UNIQUE INDEX Card_PK ON tb_Card (card_no);

-- ALTER TABLE tb_Card ADD CONSTRAINT Card_PK PRIMARY KEY (card_no) USING INDEX Card_PK;

ALTER TABLE tb_Card ADD CONSTRAINT Card_FK FOREIGN KEY (user_no) REFERENCES tb_users (user_no);

CREATE TABLE tb_Transaction (
                                transaction_id     VARCHAR2(20) PRIMARY KEY, -- 거래 ID (기본키)
                                card_no            VARCHAR2(20),             -- 카드 번호 (외래키)
                                transaction_amount NUMBER,                   -- 거래 금액
                                transaction_date   DATE,                     -- 거래 날짜
                                transaction_type   NUMBER,                   -- 거래 유형
                                transaction_account_balance    NUMBER,                   -- 거래 후 잔액
                                user_no            INTEGER,               -- 사용자 번호 (외래키)
                                transaction_before_balance     NUMBER,                   -- 거래 전 잔액
                                transaction_location           VARCHAR2(100),            -- 거래 위치
                                transaction_category           VARCHAR2(100),            -- 거래 카테고리
                                transaction_status NUMBER                    -- 거래 상태
);

-- 외래 키 설정: user_no는 Users 테이블을 참조합니다.
ALTER TABLE tb_Transaction ADD CONSTRAINT FK_Transaction_User
    FOREIGN KEY (user_no) REFERENCES tb_Users(user_no);

ALTER TABLE tb_Transaction ADD CONSTRAINT Transaction_FK FOREIGN KEY (card_no) REFERENCES tb_Card (card_no);

CREATE TABLE tb_Loan (
                         loan_id           VARCHAR2(20) PRIMARY KEY,  -- 대출 ID (기본키)
                         loan_type         VARCHAR2(50),              -- 대출 유형
                         loan_amount       NUMBER,                    -- 대출 금액
                         loan_date         DATE,                      -- 대출 날짜
                         loan_state        NUMBER,                    -- 대출 상태
                         loan_term         NUMBER,                    -- 대출 기간
                         user_no           Integer,                -- 사용자 번호 (외래키)
                         loan_code         VARCHAR2(50),              -- 대출 코드
                         loan_end_date     DATE,                      -- 대출 종료일
                         loan_name         VARCHAR2(100),             -- 대출 이름
                         loan_rate         NUMBER,                    -- 대출 이자율
                         loan_balance      NUMBER,                    -- 대출 잔액
                         loan_interest     NUMBER,                    -- 대출 이자
                         loan_account      VARCHAR2(20),              -- 대출 계좌
                         loan_bank         VARCHAR2(50),                -- 대출 은행
                         loan_repayment_date DATE                      -- 상환일


);

-- CREATE UNIQUE INDEX Loan_PK ON tb_Loan (loan_id);

-- ALTER TABLE tb_Loan ADD CONSTRAINT Loan_PK PRIMARY KEY (loan_id) USING INDEX Loan_PK;

ALTER TABLE tb_Loan ADD CONSTRAINT Loan_FK FOREIGN KEY (user_no) REFERENCES tb_Users (user_no);

-- 보험 관련 테이블 생성
CREATE TABLE tb_Insurance (
                              insurance_id      VARCHAR2(20) PRIMARY KEY,  -- 보험 ID (기본키)
                              insurance_type    VARCHAR2(50),              -- 보험 유형
                              insurance_amount  NUMBER,                    -- 보험 금액
                              insurance_start_date    DATE,                -- 보험 가입 날짜
                              insurance_end_date DATE,                     -- 보험 종료일
                              insurance_term    NUMBER,                    -- 보험 기간
                              insurance_state   NUMBER,                    -- 보험 상태
                              insurance_renewal VARCHAR2(20),              -- 보험 갱신 여부
                                insurance_payment_type VARCHAR2(20),         -- 보험 납입 구분
                                insurance_payment_cycle VARCHAR2(20),        -- 보험 납입 주기
                                insurance_payment_total NUMBER,              -- 보험 총 납입횟수
                                insurance_payment_date DATE,                -- 보험 납입일
                              user_no           Integer,                   -- 사용자 번호 (외래키) - 피보험자
                              insurance_code    VARCHAR2(50),              -- 보험 코드
                              insurance_name    VARCHAR2(100),             -- 보험 이름
                              insurance_account VARCHAR2(20),              -- 보험 계좌
                              insurance_company    VARCHAR2(50)          -- 보험 회사

);

ALTER TABLE  TB_INSURANCE ADD INSURANCE_MONTHLY_PAYMENT NUMBER; -- 월 보험료
commit;
-- CREATE UNIQUE INDEX Insurance_PK ON tb_Insurance (insurance_id);
ALTER TABLE tb_Insurance ADD CONSTRAINT Insurance_FK FOREIGN KEY (user_no) REFERENCES tb_Users (user_no);

-- 증권 관련 테이블 생성
CREATE TABLE tb_Security (
                             security_id       VARCHAR2(20) PRIMARY KEY,  -- 증권 ID (기본키)
                             security_account  VARCHAR2(20),              -- 증권 계좌
                             security_name     VARCHAR2(100),             -- 증권 이름
                             security_balance  NUMBER,                    -- 증권 잔액
                             security_type     VARCHAR2(50),              -- 증권 유형
                             security_date     DATE,                      -- 증권 날짜
                             security_state    NUMBER,                    -- 증권 상태
                             user_no           Integer,                -- 사용자 번호 (외래키)
                             security_code     VARCHAR2(50),              -- 증권 코드
                             security_rate     NUMBER,                    -- 증권 이자율
                             security_interest NUMBER,                    -- 증권 이자
                             security_bank     VARCHAR2(50)               -- 증권 은행
);

-- CREATE UNIQUE INDEX Security_PK ON tb_Security (security_id);
ALTER TABLE tb_Security ADD CONSTRAINT Security_FK FOREIGN KEY (user_no) REFERENCES tb_Users (user_no);


-- 보유 주식 관련 테이블 생성
CREATE TABLE tb_Stock (
                          stock_id          VARCHAR2(20) PRIMARY KEY,  -- 보유 주식 ID (기본키)
                          stock_type        VARCHAR2(50),              -- 주식 유형
                          stock_count       NUMBER,                    -- 주식 수량
                          stock_amount      NUMBER,                    -- 주식 매입 단가
                          stock_date        DATE,                      -- 주식 날짜
                          stock_state       NUMBER,                    -- 주식 상태
                          user_no           Integer,                -- 사용자 번호 (외래키)
                          stock_code        VARCHAR2(50),              -- 주식 코드
                          stock_name        VARCHAR2(100),             -- 주식 이름
                          stock_balance     NUMBER,                    -- 주식 잔액
                          security_account     VARCHAR2(20),              -- 주식 계좌
                          security_code     VARCHAR2(50)              -- 증권 코드
);

-- CREATE UNIQUE INDEX Stock_PK ON tb_Stock (stock_id);
ALTER TABLE tb_Stock ADD CONSTRAINT Stock_FK FOREIGN KEY (user_no) REFERENCES tb_Users (user_no);
-- ALTER TABLE tb_Stock ADD CONSTRAINT Stock_FK1 FOREIGN KEY (security_code) REFERENCES tb_Security (security_code);
-- ALTER TABLE tb_Stock ADD CONSTRAINT Stock_FK2 FOREIGN KEY (security_account) REFERENCES tb_Security (security_account);

-- 고유 제약 조건 확인
SELECT constraint_name, column_name
FROM all_cons_columns
WHERE table_name = 'TB_FAMILY' AND constraint_name LIKE 'SYS%';

drop table tb_family;

CREATE SEQUENCE BANKSTATEMENT_SEQ
    START WITH 3 -- 초기 값
    INCREMENT BY 1 -- 증가 값
    NOCACHE;

CREATE OR REPLACE TRIGGER trg_bankstatement_transaction_no
    BEFORE INSERT ON TB_BANKSTATEMENT
    FOR EACH ROW
    WHEN (NEW.TRANSACTION_NO IS NULL)  -- TRANSACTION_NO가 NULL일 때만 시퀀스 할당
BEGIN
    -- TRANSACTION_NO에 시퀀스 값 할당
    :NEW.TRANSACTION_NO := BANKSTATEMENT_SEQ.NEXTVAL;
END;
/

commit;