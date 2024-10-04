create table CARD.TB_USERS
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

create trigger CARD.TRG_TB_MEMBERS_USER_NO
    before insert
    on CARD.TB_USERS
    for each row
BEGIN
    IF :NEW.user_no IS NULL THEN
    SELECT user_no_seq.NEXTVAL INTO :NEW.user_no FROM dual;
END IF;
END;
/

create table CARD.TB_CARD
(
    CARD_NO           VARCHAR2(20) not null
        primary key,
    USER_NO           NUMBER
        constraint CARD_FK
            references CARD.TB_USERS,
    CARD_PASSWD       NUMBER,
    CARD_PERIOD       DATE,
    CARD_CVC          VARCHAR2(3),
    CARD_USER         VARCHAR2(50),
    CARD_NAME         VARCHAR2(100),
    CARD_TYPE         VARCHAR2(50),
    CARD_LIMIT        NUMBER,
    CARD_CODE         NUMBER,
    CARD_BALANCE      NUMBER,
    CARD_PRODUCT_CODE NUMBER
)
    /



create table CARD.TB_TRANSACTION
(
    TRANSACTION_ID              VARCHAR2(20) not null
        primary key,
    CARD_NO                     VARCHAR2(20)
        constraint TRANSACTION_FK
        references CARD.TB_CARD,
    TRANSACTION_AMOUNT          NUMBER,
    TRANSACTION_DATE            DATE,
    TRANSACTION_TYPE            NUMBER,
    TRANSACTION_ACCOUNT_BALANCE NUMBER,
    USER_NO                     NUMBER
        constraint FK_TRANSACTION_USER
            references CARD.TB_USERS,
    TRANSACTION_BEFORE_BALANCE  NUMBER,
    TRANSACTION_LOCATION        VARCHAR2(100),
    TRANSACTION_CATEGORY        NUMBER,
    TRANSACTION_STATUS          NUMBER
)
    /

CREATE SEQUENCE CARD.user_no_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
