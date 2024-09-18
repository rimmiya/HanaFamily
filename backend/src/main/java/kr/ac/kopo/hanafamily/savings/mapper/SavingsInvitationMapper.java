package kr.ac.kopo.hanafamily.savings.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.SavingsInvitationDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SavingsInvitationMapper {
  void insertInvitation(SavingsInvitationDTO invitation);
  SavingsInvitationDTO selectInvitationById(int invitationId);
  List<SavingsInvitationDTO> selectPendingInvitationsByInviteeUserId(int inviteeUserId);
  void updateInvitationStatus(int invitationId, String status);
}
