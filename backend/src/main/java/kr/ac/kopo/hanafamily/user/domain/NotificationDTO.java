package kr.ac.kopo.hanafamily.user.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
  private String title;   // 알림 제목
  private String message; // 알림 메시지
  private String type;    // 알림 유형 (info, warning 등)
  private Integer invitationId; // 초대 알림일 경우 초대 ID 추가 (null 가능)
  private String savingAccountNo; // 저축 계좌 번호 (null 가능)
}
