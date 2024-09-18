package kr.ac.kopo.hanafamily.savings.controller;

import kr.ac.kopo.hanafamily.savings.dto.*;
import kr.ac.kopo.hanafamily.savings.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
public class SavingsController {

  @Autowired
  private SavingsService savingsService;


  @PostMapping("/create")
  public SavingProductDTO createSavingsProduct(@RequestBody CreateSavingsProductRequestDTO requestDTO) {
    SavingProductDTO savingProduct = requestDTO.getSavingProduct();
    List<Integer> inviteeUserIds = requestDTO.getInviteeUserIds();
    CreateSavingsRequestDTO createSavingsRequestDTO = requestDTO.getCreateSavingsRequest();

    return savingsService.createSavingsProduct(savingProduct, inviteeUserIds, createSavingsRequestDTO);
  }

  @PostMapping("/deposit")
  public void deposit(@RequestBody DepositRequestDTO depositRequestDTO) {
    String savingAccountNo = depositRequestDTO.getSavingAccountNo();
    Integer userNo = depositRequestDTO.getUserNo();
    Integer amount = depositRequestDTO.getAmount();

    savingsService.deposit(savingAccountNo, userNo, amount);
  }

  @PostMapping("/accept-invitation")
  public void acceptInvitation(@RequestBody AcceptInvitationRequestDTO acceptRequestDTO) {
    Integer invitationId = acceptRequestDTO.getInvitationId();
    SavingsParticipationDTO participationDetails = acceptRequestDTO.getParticipationDetails();
    savingsService.acceptInvitation(invitationId, participationDetails);
  }

  @PostMapping("/decline-invitation")
  public void declineInvitation(@RequestParam Integer invitationId) {
    savingsService.declineInvitation(invitationId);
  }

  //
  @GetMapping("/invitations") // 컨트롤러 설명 : 사용자에게 보낸 저축 초대 목록을 반환합니다.
  public List<SavingsInvitationDTO> getPendingInvitations(@RequestParam Integer inviteeUserId) {
    return savingsService.getPendingInvitations(inviteeUserId);
  }

  @GetMapping("/family-savings")
  public List<SavingProductDTO> getFamilySavingsList(@RequestParam Integer familyId) {
    return savingsService.getFamilySavingsList(familyId);
  }

  @GetMapping("/transactions")
  public List<SavingsTransactionDTO> getTransactionHistory(@RequestParam String savingAccountNo) {
    return savingsService.getTransactionHistory(savingAccountNo);
  }

  @GetMapping("/participation-details")
  public List<SavingsParticipationDTO> getParticipationDetails(@RequestParam String savingAccountNo) {
    return savingsService.getParticipationDetails(savingAccountNo);
  }

  @GetMapping("/saving-product")
  public SavingProductDTO getSavingProduct(@RequestParam String savingAccountNo) {
    return savingsService.getSavingProduct(savingAccountNo);
  }
}
