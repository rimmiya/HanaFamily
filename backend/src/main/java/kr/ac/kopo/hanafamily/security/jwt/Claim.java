package kr.ac.kopo.hanafamily.security.jwt;

import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import lombok.Data;

@Data
public class Claim {
  private UserDTO userDTO;
  private String ImgUrl;
}