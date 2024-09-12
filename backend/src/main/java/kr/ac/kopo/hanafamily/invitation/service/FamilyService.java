package kr.ac.kopo.hanafamily.invitation.service;

import kr.ac.kopo.hanafamily.invitation.dto.FamilyDTO;
import kr.ac.kopo.hanafamily.user.domain.FamilyMemberDTO;
import kr.ac.kopo.hanafamily.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FamilyService {

  @Autowired
  private UserMapper userMapper;

  public void handleInvitationAcceptance(String inviterId, String inviteeId) {
    // 유저가 이미 family_id를 가지고 있는지 확인
    Integer inviterFamilyId = userMapper.getUserFamilyId(inviterId);

    // 초대자가 이미 가족에 속해 있으면 그 가족 ID를 초대받은 사람에게 할당
    if (inviterFamilyId != null) {
      // 초대받은 사람의 family_id 업데이트
      userMapper.updateUserFamilyId(inviterFamilyId, inviteeId);
    } else {
      // 초대자가 가족에 속해 있지 않으면 새로운 family 레코드 생성
      FamilyDTO family = new FamilyDTO();
//      family.setInviterNo(inviterId);
//      family.setInviteeNo(inviteeId);
//      family.setRelationship(relationship);
//      family.setInvitationCode(invitationCode);

      userMapper.insertFamily(family);

      System.out.println("family_id: " + family.getFamilyId());
      System.out.println("inviter_id: " + inviterId);
      System.out.println("invitee_id: " + inviteeId);
      // 생성된 family_id로 초대자와 초대받은 사람의 family_id 업데이트
      userMapper.updateUserFamilyId(family.getFamilyId(), inviterId);
      userMapper.updateUserFamilyId(family.getFamilyId(), inviteeId);
    }
  }

  public FamilyMemberDTO getFamilyMembers(Integer familyId) {
    FamilyMemberDTO familyMemberDTO = userMapper.getFamilyMembers(familyId);

    return familyMemberDTO;
  }
}
