package kr.ac.kopo.hanafamily.savings.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavingsInvitationDTO {
  private Integer invitationId; // INVITATION_ID
  private String savingAccountNo; // SAVING_ACCOUNT_NO
  private Integer inviterUserId; // INVITER_USER_ID
  private Integer inviteeUserId; // INVITEE_USER_ID
  private Date invitationDate; // INVITATION_DATE
  private String status; // STATUS ('PENDING', 'ACCEPTED', 'DECLINED')
}
