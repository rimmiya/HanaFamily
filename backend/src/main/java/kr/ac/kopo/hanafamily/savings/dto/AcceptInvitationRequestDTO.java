package kr.ac.kopo.hanafamily.savings.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcceptInvitationRequestDTO {

  private Integer invitationId; // INVITATION_ID
  private SavingsParticipationDTO participationDetails; // 참여 상세 정보
}