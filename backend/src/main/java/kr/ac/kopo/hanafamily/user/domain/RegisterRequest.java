package kr.ac.kopo.hanafamily.user.domain;

import lombok.Data;

@Data
public class RegisterRequest {
  private String birthDate;
  private String email;
  private String gender;
  private String id;
  private String name;
  private String password;
  private String phoneNumber;
  private String ssnLast;
}