
-- 가족 3명 생성
INSERT INTO tb_family (family_id, family_registration_date, family_status, family_inviter_no, family_invitation_date, family_invitation_code, family_invitation_status, family_relationship, family_invitee_no)
VALUES (1, SYSDATE, 'ACTIVE', NULL, NULL, NULL, NULL, 'Family', NULL);

INSERT INTO tb_family (family_id, family_registration_date, family_status, family_inviter_no, family_invitation_date, family_invitation_code, family_invitation_status, family_relationship, family_invitee_no)
VALUES (2, SYSDATE, 'ACTIVE', NULL, NULL, NULL, NULL, 'Family', NULL);

INSERT INTO tb_family (family_id, family_registration_date, family_status, family_inviter_no, family_invitation_date, family_invitation_code, family_invitation_status, family_relationship, family_invitee_no)
VALUES (3, SYSDATE, 'ACTIVE', NULL, NULL, NULL, NULL, 'Family', NULL);

-- 가족 1의 유저 3명
INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (1, 'John Doe', 'user1', 'password1', 'M', 'john@example.com', '010-1111-1111', 'Seoul', '900101-1234567', 'ACTIVE', TO_DATE('1990-01-01', 'YYYY-MM-DD'), SYSDATE, 1);

INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (2, 'Jane Doe', 'user2', 'password2', 'F', 'jane@example.com', '010-2222-2222', 'Seoul', '910202-2345678', 'ACTIVE', TO_DATE('1991-02-02', 'YYYY-MM-DD'), SYSDATE, 1);

INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (3, 'Jake Doe', 'user3', 'password3', 'M', 'jake@example.com', '010-3333-3333', 'Seoul', '920303-3456789', 'ACTIVE', TO_DATE('1992-03-03', 'YYYY-MM-DD'), SYSDATE, 1);

-- 가족 2의 유저 3명
INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (4, 'Tom Smith', 'user4', 'password4', 'M', 'tom@example.com', '010-4444-4444', 'Busan', '930404-4567890', 'ACTIVE', TO_DATE('1993-04-04', 'YYYY-MM-DD'), SYSDATE, 2);

INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (5, 'Alice Smith', 'user5', 'password5', 'F', 'alice@example.com', '010-5555-5555', 'Busan', '940505-5678901', 'ACTIVE', TO_DATE('1994-05-05', 'YYYY-MM-DD'), SYSDATE, 2);

INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (6, 'Bob Smith', 'user6', 'password6', 'M', 'bob@example.com', '010-6666-6666', 'Busan', '950606-6789012', 'ACTIVE', TO_DATE('1995-06-06', 'YYYY-MM-DD'), SYSDATE, 2);

-- 가족 3의 유저 3명
INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (7, 'Chris Lee', 'user7', 'password7', 'M', 'chris@example.com', '010-7777-7777', 'Incheon', '960707-7890123', 'ACTIVE', TO_DATE('1996-07-07', 'YYYY-MM-DD'), SYSDATE, 3);

INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (8, 'Diana Lee', 'user8', 'password8', 'F', 'diana@example.com', '010-8888-8888', 'Incheon', '970808-8901234', 'ACTIVE', TO_DATE('1997-08-08', 'YYYY-MM-DD'), SYSDATE, 3);

INSERT INTO tb_users (user_no, user_name, user_id, user_pw, user_gender, user_email, user_phone_no, user_address, user_resident_id, user_status, user_birth, user_register_dt, family_id)
VALUES (9, 'Evan Lee', 'user9', 'password9', 'M', 'evan@example.com', '010-9999-9999', 'Incheon', '980909-9012345', 'ACTIVE', TO_DATE('1998-09-09', 'YYYY-MM-DD'), SYSDATE, 3);

-- 각 유저당 3개의 계좌 데이터 생성
-- 유저 1
INSERT INTO tb_Account (account_no, user_no, account_name, account_password, account_balance, account_create_date, account_status, bank_code, account_type, account_limit, account_expire_date)
VALUES ('ACC1-1', 1, 'Checking', 1234, 10000, SYSDATE, 1, 101, 1, 50000, TO_DATE('2025-12-31', 'YYYY-MM-DD'));

INSERT INTO tb_Account (account_no, user_no, account_name, account_password, account_balance, account_create_date, account_status, bank_code, account_type, account_limit, account_expire_date)
VALUES ('ACC1-2', 2, 'Savings', 1234, 20000, SYSDATE, 1, 102, 1, 60000, TO_DATE('2025-12-31', 'YYYY-MM-DD'));

INSERT INTO tb_Account (account_no, user_no, account_name, account_password, account_balance, account_create_date, account_status, bank_code, account_type, account_limit, account_expire_date)
VALUES ('ACC1-3', 1, 'Credit', 1234, 30000, SYSDATE, 1, 103, 1, 70000, TO_DATE('2025-12-31', 'YYYY-MM-DD'));

-- 유저 2 ~ 유저 9도 동일한 방식으로 계좌 생성
-- 유저 1의 카드 3개
INSERT INTO tb_Card (card_no, user_no, card_passwd, card_period, card_cvc, card_user, card_name, card_type, card_limit, card_code, card_balance, card_product_code)
VALUES ('CARD1-1', 1, 123, SYSDATE, '111', 'John Doe', 'Visa', 'Credit', 5000, 101, 1000, 301);

INSERT INTO tb_Card (card_no, user_no, card_passwd, card_period, card_cvc, card_user, card_name, card_type, card_limit, card_code, card_balance, card_product_code)
VALUES ('CARD1-2', 1, 123, SYSDATE, '222', 'John Doe', 'MasterCard', 'Debit', 6000, 102, 2000, 302);

INSERT INTO tb_Card (card_no, user_no, card_passwd, card_period, card_cvc, card_user, card_name, card_type, card_limit, card_code, card_balance, card_product_code)
VALUES ('CARD1-3', 1, 123, SYSDATE, '333', 'John Doe', 'Amex', 'Credit', 7000, 103, 3000, 303);

-- 유저 1의 거래 3개
INSERT INTO tb_Transaction (transaction_id, card_no, transaction_amount, transaction_date, transaction_type, transaction_account_balance, user_no, transaction_before_balance, transaction_location, transaction_category, transaction_status)
VALUES ('TRANS1-1', 'CARD1-1', 100, SYSDATE, 1, 1000, 1, 2000, 'Seoul', 'Shopping', 1);

INSERT INTO tb_Transaction (transaction_id, card_no, transaction_amount, transaction_date, transaction_type, transaction_account_balance, user_no, transaction_before_balance, transaction_location, transaction_category, transaction_status)
VALUES ('TRANS1-2', 'CARD1-2', 200, SYSDATE, 1, 2000, 1, 3000, 'Busan', 'Dining', 1);

INSERT INTO tb_Transaction (transaction_id, card_no, transaction_amount, transaction_date, transaction_type, transaction_account_balance, user_no, transaction_before_balance, transaction_location, transaction_category, transaction_status)
VALUES ('TRANS1-3', 'CARD1-3', 300, SYSDATE, 1, 3000, 1, 4000, 'Incheon', 'Entertainment', 1);

-- 유저 1의 대출 3개
INSERT INTO tb_Loan (loan_id, loan_type, loan_amount, loan_date, loan_state, loan_term, user_no, loan_code, loan_end_date, loan_name, loan_rate, loan_balance, loan_interest, loan_account, loan_bank)
VALUES ('LOAN1-1', 'Home Loan', 100000, SYSDATE, 1, 30, 1, 'HML001', TO_DATE('2030-12-31', 'YYYY-MM-DD'), 'Home Loan', 3.5, 100000, 3500, 'ACC1-1', 'Bank A');

INSERT INTO tb_Loan (loan_id, loan_type, loan_amount, loan_date, loan_state, loan_term, user_no, loan_code, loan_end_date, loan_name, loan_rate, loan_balance, loan_interest, loan_account, loan_bank)
VALUES ('LOAN1-2', 'Car Loan', 50000, SYSDATE, 1, 15, 1, 'CRL001', TO_DATE('2025-12-31', 'YYYY-MM-DD'), 'Car Loan', 4.0, 50000, 2000, 'ACC1-2', 'Bank B');

INSERT INTO tb_Loan (loan_id, loan_type, loan_amount, loan_date, loan_state, loan_term, user_no, loan_code, loan_end_date, loan_name, loan_rate, loan_balance, loan_interest, loan_account, loan_bank)
VALUES ('LOAN1-3', 'Personal Loan', 20000, SYSDATE, 1, 5, 1, 'PRL001', TO_DATE('2023-12-31', 'YYYY-MM-DD'), 'Personal Loan', 5.0, 20000, 1000, 'ACC1-3', 'Bank C');

-- 유저 2 ~ 유저 9도 동일한 방식으로 데이터 생성


-- 보험 데이터 삽입
INSERT INTO tb_Insurance (insurance_id, insurance_type, insurance_amount, insurance_start_date, insurance_end_date, insurance_term, insurance_state, insurance_renewal, insurance_payment_type, insurance_payment_cycle, insurance_payment_total, insurance_payment_date, user_no, insurance_code, insurance_name, insurance_account, insurance_company)
VALUES ('INS001', 'Health', 500000, SYSDATE, TO_DATE('2030-12-31', 'YYYY-MM-DD'), 10, 1, 'Yes', 'Monthly', 'Monthly', 120, SYSDATE, 1, 'HEALTH001', 'Health Insurance', 'ACC001', 'Insurance Co.');

INSERT INTO tb_Insurance (insurance_id, insurance_type, insurance_amount, insurance_start_date, insurance_end_date, insurance_term, insurance_state, insurance_renewal, insurance_payment_type, insurance_payment_cycle, insurance_payment_total, insurance_payment_date, user_no, insurance_code, insurance_name, insurance_account, insurance_company)
VALUES ('INS002', 'Car', 1000000, SYSDATE, TO_DATE('2025-12-31', 'YYYY-MM-DD'), 5, 1, 'No', 'Quarterly', 'Quarterly', 20, SYSDATE, 2, 'CAR001', 'Car Insurance', 'ACC002', 'Insurance Co.');

INSERT INTO tb_Insurance (insurance_id, insurance_type, insurance_amount, insurance_start_date, insurance_end_date, insurance_term, insurance_state, insurance_renewal, insurance_payment_type, insurance_payment_cycle, insurance_payment_total, insurance_payment_date, user_no, insurance_code, insurance_name, insurance_account, insurance_company)
VALUES ('INS003', 'Life', 2000000, SYSDATE, TO_DATE('2040-12-31', 'YYYY-MM-DD'), 20, 1, 'Yes', 'Yearly', 'Yearly', 20, SYSDATE, 3, 'LIFE001', 'Life Insurance', 'ACC003', 'Insurance Co.');

-- 증권 데이터 삽입
INSERT INTO tb_Security (security_id, security_account, security_name, security_balance, security_type, security_date, security_state, user_no, security_code, security_rate, security_interest, security_bank)
VALUES ('SEC001', 'ACC001', 'Stock A', 1000000, 'Equity', SYSDATE, 1, 1, 'STOCKA001', 2.5, 50000, 'Bank A');

INSERT INTO tb_Security (security_id, security_account, security_name, security_balance, security_type, security_date, security_state, user_no, security_code, security_rate, security_interest, security_bank)
VALUES ('SEC002', 'ACC002', 'Stock B', 1500000, 'Equity', SYSDATE, 1, 2, 'STOCKB001', 3.0, 60000, 'Bank B');

INSERT INTO tb_Security (security_id, security_account, security_name, security_balance, security_type, security_date, security_state, user_no, security_code, security_rate, security_interest, security_bank)
VALUES ('SEC003', 'ACC003', 'Bond C', 2000000, 'Bond', SYSDATE, 1, 3, 'BONDC001', 1.5, 30000, 'Bank C');


-- 보유 주식 데이터 삽입
INSERT INTO tb_Stock (stock_id, stock_type, stock_count, stock_amount, stock_date, stock_state, user_no, stock_code, stock_name, stock_balance, security_account, security_code)
VALUES ('STOCK001', 'Equity', 100, 50000, SYSDATE, 1, 1, 'STOCKA001', 'Stock A', 5000000, 'ACC001', 'SEC001');

INSERT INTO tb_Stock (stock_id, stock_type, stock_count, stock_amount, stock_date, stock_state, user_no, stock_code, stock_name, stock_balance, security_account, security_code)
VALUES ('STOCK002', 'Equity', 200, 60000, SYSDATE, 1, 2, 'STOCKB001', 'Stock B', 12000000, 'ACC002', 'SEC002');

INSERT INTO tb_Stock (stock_id, stock_type, stock_count, stock_amount, stock_date, stock_state, user_no, stock_code, stock_name, stock_balance, security_account, security_code)
VALUES ('STOCK003', 'Bond', 50, 100000, SYSDATE, 1, 3, 'BONDC001', 'Bond C', 5000000, 'ACC003', 'SEC003');
