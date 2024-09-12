package kr.ac.kopo.hanafamily.invitation.controller;

import kr.ac.kopo.hanafamily.invitation.dto.InvitationDTO;
import kr.ac.kopo.hanafamily.invitation.dto.InvitationRequestDTO;
import kr.ac.kopo.hanafamily.invitation.dto.VerifyInvitationRequestDTO;
import kr.ac.kopo.hanafamily.invitation.service.FamilyService;
import kr.ac.kopo.hanafamily.invitation.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

  @Autowired
  private InvitationService invitationService;

  @Autowired
  private FamilyService familyService;

  // 초대장 발급 API
  @PostMapping("/send")
  public ResponseEntity<InvitationDTO> sendInvitation(@RequestBody InvitationRequestDTO request) {
    InvitationDTO invitation = invitationService.sendInvitation(request.getUserNo(), request.getInviteePhone());
    return ResponseEntity.ok(invitation);
  }

  // 초대장 검증 API
  @PostMapping("/verify")
  public ResponseEntity<String> verifyInvitation(@RequestBody VerifyInvitationRequestDTO request) {
    boolean isValid = invitationService.verifyInvitation(request.getInviteKey(), request.getUserId());
    if (isValid) {
      String inviter = invitationService.getInviterByInviteKey(request.getInviteKey());
      familyService.handleInvitationAcceptance(inviter,request.getUserId());
      return ResponseEntity.ok("초대가 완료되었습니다.");
    } else {
      return ResponseEntity.badRequest().body("초대가 유효하지 않거나 만료되었습니다.");
    }
  }


}
