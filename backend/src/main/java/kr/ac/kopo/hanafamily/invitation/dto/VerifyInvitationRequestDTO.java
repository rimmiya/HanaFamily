package kr.ac.kopo.hanafamily.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyInvitationRequestDTO {
  private String inviteKey;  // 초대장 식별 키
  public String userId;  // 사용자의 아이디
//  private String userPhone;  // 사용자의 전화번호
}