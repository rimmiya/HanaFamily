-- 시퀀스 생성
CREATE SEQUENCE invitation_seq
    START WITH 1 -- 초기 값
    INCREMENT BY 1 -- 증가 값
    NOCACHE; -- 시퀀스 값 캐싱 안 함

-- 테이블 생성 (AUTO_INCREMENT 대신 시퀀스를 사용)
CREATE TABLE tb_invitation (
                               id NUMBER PRIMARY KEY,
                               user_no NUMBER NOT NULL,              -- 발급자 ID
                               invitee_phone VARCHAR2(20),           -- 초대자 전화번호
                               invite_key VARCHAR2(255) UNIQUE,      -- 유일한 식별키
                               is_used NUMBER(1) DEFAULT 0,          -- 사용 여부 (BOOLEAN 대신 NUMBER 사용)
                               expiry_date TIMESTAMP,                -- 만료일
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 발급자(user_no) 외래키 설정
ALTER TABLE tb_invitation
    ADD CONSTRAINT Invitation_FK FOREIGN KEY (user_no) REFERENCES tb_Users (user_no);

-- 트리거 생성 (INSERT 시 자동으로 시퀀스 값을 id 필드에 할당)
CREATE OR REPLACE TRIGGER trg_tb_invitation_id
    BEFORE INSERT ON tb_invitation
    FOR EACH ROW
    WHEN (NEW.id IS NULL) -- id 값이 NULL일 때만 시퀀스 적용
BEGIN
    SELECT invitation_seq.NEXTVAL INTO :NEW.id FROM dual;
END;
/