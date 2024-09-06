package kr.ac.kopo.hanafamily.user.domain;
import lombok.Value;
@Value
public class LoginRequest {
  String userId;
  String userPw;
}