package kr.ac.kopo.hanafamily.invitation.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvitationDTO {

  private Integer id;
  private Integer userNo;         // 발급자 ID
  private String inviteePhone; // 초대자 전화번호
  private String inviteKey;    // 초대장 식별키
  private Integer isUsed;      // 사용 여부
  private LocalDateTime expiryDate; // 만료일
  private LocalDateTime createdAt;  // 생성일
}
