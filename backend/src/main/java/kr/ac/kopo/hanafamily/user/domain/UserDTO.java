package kr.ac.kopo.hanafamily.user.domain;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  private Integer userNo;
  private String userName;
  private String userId;
  private String userPw;
  private String userGender;
  private String userEmail;
  private String userPhoneNo;
  private String address;
  private Date registerDt;
  private Date modifiedDt;
  private Integer familyId;
  private String residentId;
  private String userStatus;
  private Date userBirth;

}