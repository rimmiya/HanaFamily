package kr.ac.kopo.hanafamily.savings.service;

import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.CreateSavingsRequestDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingProductDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsInvitationDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsParticipationDTO;

public interface SavingsService {
  SavingProductDTO createSavingsProduct(SavingProductDTO savingProduct, List<Integer> participantUserNos, CreateSavingsRequestDTO createSavingsRequestDTO);
  void deposit(String savingAccountNo, Integer userNo, Integer amount);
  void acceptInvitation(Integer invitationId, SavingsParticipationDTO participationDetails);
  void declineInvitation(Integer invitationId);
  List<SavingsInvitationDTO> getPendingInvitations(int inviteeUserId);
  void checkGoalAchievement(String savingAccountNo);
  void processAutomaticTermination();
  void processAutomaticTransfers();
}