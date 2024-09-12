package kr.ac.kopo.hanafamily.invitation.service;

import java.time.LocalDateTime;
import java.util.UUID;
import kr.ac.kopo.hanafamily.invitation.dto.InvitationDTO;
import kr.ac.kopo.hanafamily.invitation.mapper.InvitationMapper;
import kr.ac.kopo.hanafamily.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationService {

  @Autowired
  private InvitationMapper invitationMapper;

  @Autowired
  private UserMapper userMapper;

  public InvitationDTO sendInvitation(Integer user_no, String inviteePhone) {
    // 유일한 초대장 식별키 생성
    String inviteKey = UUID.randomUUID().toString();

    // 초대장 정보 생성
    InvitationDTO invitation = new InvitationDTO();
    invitation.setUserNo(user_no);
    invitation.setInviteePhone(inviteePhone);
    invitation.setInviteKey(inviteKey);
    invitation.setIsUsed(0);
    invitation.setExpiryDate(LocalDateTime.now().plusDays(7)); // 만료일 7일 설정
    invitation.setCreatedAt(LocalDateTime.now());

    // 초대장 정보 DB에 저장
    invitationMapper.insertInvitation(invitation);

    // 생성된 초대장 ID 조회
    int generatedId = invitationMapper.getLastInsertId(inviteKey);
    invitation.setId(generatedId);

    return invitation;
  }

  public boolean verifyInvitation(String inviteKey, String userId) {
    InvitationDTO invitation = invitationMapper.findByInviteKey(inviteKey);

    String userPhone = userMapper.getPhoneNumberById(userId);
    // 초대장이 존재하지 않거나 이미 사용된 경우
    if (invitation == null || invitation.getIsUsed() == 1) {
      assert invitation != null;
      System.out.println(invitation.getIsUsed());
      System.out.println("초대장이 존재하지 않거나 이미 사용된 경우");
      return false;
    }

    // 초대장이 만료된 경우
    if (invitation.getExpiryDate().isBefore(LocalDateTime.now())) {
      System.out.println("초대장이 만료된 경우");
      return false;
    }

    // 초대한 사람이 아닌 경우
    if (!invitation.getInviteePhone().equals(userPhone)) {
      System.out.println("초대한 사람이 아닌 경우");
      return false;
    }

    // 초대장이 유효한 경우, isUsed 플래그를 true로 변경
    invitationMapper.markAsUsed(invitation.getId());
    return true;
  }

  public String getInviterByInviteKey(String inviteKey) {
    return invitationMapper.getUserIdByInviteKey(inviteKey);
  }
}
