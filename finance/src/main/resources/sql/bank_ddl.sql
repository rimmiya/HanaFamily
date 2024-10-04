create table BANK.TB_USERS
(
    USER_NO          NUMBER        not null
        primary key,
    USER_NAME        VARCHAR2(100) not null,
    USER_ID          VARCHAR2(50)  not null,
    USER_PW          VARCHAR2(100) not null,
    USER_GENDER      VARCHAR2(10),
    USER_EMAIL       VARCHAR2(100),
    USER_PHONE_NO    VARCHAR2(20),
    USER_ADDRESS     VARCHAR2(200),
    USER_RESIDENT_ID VARCHAR2(14),
    USER_STATUS      VARCHAR2(20),
    USER_BIRTH       DATE,
    USER_REGISTER_DT DATE default SYSDATE,
    USER_MODIFIED_DT DATE,
    FAMILY_ID        NUMBER
)
/

create trigger BANK.TRG_TB_MEMBERS_USER_NO
    before insert
    on BANK.TB_USERS
    for each row
BEGIN
    IF :NEW.user_no IS NULL THEN
        SELECT user_no_seq.NEXTVAL INTO :NEW.user_no FROM dual;
    END IF;
END;
/

create table BANK.TB_ACCOUNT
(
    ACCOUNT_NO          VARCHAR2(20) not null
        primary key,
    USER_NO             NUMBER
        constraint FK_ACCOUNT_USER
            references BANK.TB_USERS,
    ACCOUNT_NAME        VARCHAR2(100),
    ACCOUNT_PASSWORD    NUMBER,
    ACCOUNT_BALANCE     NUMBER,
    ACCOUNT_CREATE_DATE DATE,
    ACCOUNT_STATUS      NUMBER,
    BANK_CODE           NUMBER,
    ACCOUNT_TYPE        NUMBER,
    ACCOUNT_LIMIT       NUMBER,
    ACCOUNT_EXPIRE_DATE DATE
)
    /

create table BANK.TB_BANKSTATEMENT
(
    TRANSACTION_NO     NUMBER not null
        primary key,
    ACCOUNT_NO         VARCHAR2(20)
        constraint BANKSTATEMENT_FK
        references BANK.TB_ACCOUNT,
    TRANSACTION_AMOUNT NUMBER,
    TRANSACTION_DATE   DATE,
    TRANSACTION_TYPE   NUMBER,
    ACCOUNT_BALANCE    NUMBER,
    USER_NO            NUMBER,
    BEFORE_BALANCE     NUMBER,
    ACCOUNT_NO_TO      VARCHAR2(20)
)
    /

create table BANK.TB_LOAN
(
    LOAN_ID                VARCHAR2(20) not null
        primary key,
    LOAN_TYPE              VARCHAR2(50),
    LOAN_AMOUNT            NUMBER,
    LOAN_DATE              DATE,
    LOAN_STATE             NUMBER,
    LOAN_TERM              NUMBER,
    USER_NO                NUMBER
        constraint LOAN_FK
            references BANK.TB_USERS,
    LOAN_CODE              VARCHAR2(50),
    LOAN_END_DATE          DATE,
    LOAN_NAME              VARCHAR2(100),
    LOAN_RATE              NUMBER,
    LOAN_BALANCE           NUMBER,
    LOAN_INTEREST          NUMBER,
    LOAN_ACCOUNT           VARCHAR2(20),
    LOAN_BANK              VARCHAR2(50),
    LOAN_REPAYMENT_DATE    DATE,
    LOAN_MONTYLY_REPAYMENT NUMBER
)
    /


CREATE SEQUENCE BANK.user_no_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;