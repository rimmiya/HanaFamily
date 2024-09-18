package kr.ac.kopo.hanafamily.user.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserNameDTO {
  private Integer userNo;
  private String userName;
}
