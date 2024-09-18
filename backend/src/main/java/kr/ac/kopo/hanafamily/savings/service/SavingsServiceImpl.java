package kr.ac.kopo.hanafamily.savings.service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.CreateSavingsRequestDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingProductDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsInvitationDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsParticipationDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsTransactionDTO;
import kr.ac.kopo.hanafamily.savings.mapper.SavingProductMapper;
import kr.ac.kopo.hanafamily.savings.mapper.SavingsInvitationMapper;
import kr.ac.kopo.hanafamily.savings.mapper.SavingsParticipationMapper;
import kr.ac.kopo.hanafamily.savings.mapper.SavingsTransactionMapper;
import kr.ac.kopo.hanafamily.sms.service.SendMessageService;
import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import kr.ac.kopo.hanafamily.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SavingsServiceImpl implements SavingsService {

  @Autowired
  private SavingProductMapper savingProductMapper;

  @Autowired
  private SavingsParticipationMapper savingsParticipationMapper;

  @Autowired
  private SavingsTransactionMapper savingsTransactionMapper;

  @Autowired
  private SavingsInvitationMapper savingsInvitationMapper;

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private AccountService accountService;

  @Autowired
  private SendMessageService smsService;

  private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(SavingsServiceImpl.class);

  @Override
  @Transactional
  public SavingProductDTO createSavingsProduct(SavingProductDTO savingProduct, List<Integer> inviteeUserIds, CreateSavingsRequestDTO createSavingsRequestDTO) {
    // 시작일 설정
    savingProduct.setStartDate(new Date());
    // 현재 금액 초기화
    savingProduct.setCurrentAmount(0);
    // 상태 설정
    savingProduct.setSavingStatus("ACTIVE");

    // 적금 상품 등록
    savingProductMapper.insertSavingProduct(savingProduct);

    UserDTO user = userMapper.selectUserByNo(savingProduct.getUserNo());

    // 대표자 참여 등록
    SavingsParticipationDTO representativeParticipation = new SavingsParticipationDTO();
    representativeParticipation.setSavingAccountNo(savingProduct.getSavingAccountNo());
    representativeParticipation.setUserAccountNo(createSavingsRequestDTO.getUserAccountNo());
    representativeParticipation.setUserId(savingProduct.getUserNo());
    representativeParticipation.setStartDate(new Date());
    representativeParticipation.setFamilyId(user.getFamilyId());
    representativeParticipation.setTotalAmount(createSavingsRequestDTO.getAutoTransferAmount());
    // 대표자는 수락 없이 바로 참여자로 등록되므로 상세 정보 설정 필요
    representativeParticipation.setAutoTransferDate(createSavingsRequestDTO.getAutoTransferDate());
    representativeParticipation.setAutoTransferAmount(createSavingsRequestDTO.getAutoTransferAmount());
    representativeParticipation.setAutoTransferSmsYn(createSavingsRequestDTO.getAutoTransferSmsYn());
    representativeParticipation.setMaturitySmsYn(createSavingsRequestDTO.getMaturitySmsYn());
    representativeParticipation.setSuccessfulTransfers(0);
    representativeParticipation.setBonusApplied(false);
    representativeParticipation.setUserAccountNo(createSavingsRequestDTO.getUserAccountNo());
    savingsParticipationMapper.insertSavingsParticipation(representativeParticipation);

    // 첫 입금 처리: 사용자의 계좌에서 첫 입금 금액을 적금 계좌로 이체
    accountService.transferFromUserAccountToSavings(createSavingsRequestDTO.getUserAccountNo(), savingProduct.getSavingAccountNo(), createSavingsRequestDTO.getAutoTransferAmount());

    // 가족 구성원 초대 생성
    for (Integer inviteeUserId : inviteeUserIds) {
      SavingsInvitationDTO invitation = new SavingsInvitationDTO();
      invitation.setSavingAccountNo(savingProduct.getSavingAccountNo());
      invitation.setInviterUserId(savingProduct.getUserNo());
      invitation.setInviteeUserId(inviteeUserId);
      invitation.setInvitationDate(new Date());
      invitation.setStatus("PENDING");
      savingsInvitationMapper.insertInvitation(invitation);

      // 초대 알림 발송 (NotificationService 필요)
      // notificationService.sendInvitation(inviteeUserId, invitation);
      // 초대 알림 발송
      UserDTO invitee = userMapper.selectUserByNo(inviteeUserId);
      if (invitee != null && invitee.getUserPhoneNo() != null && !invitee.getUserPhoneNo().isEmpty()) {
        String message = String.format("안녕하세요 %s님, %s님의 함께 적금에 초대되었습니다. 링크를 통해 초대를 수락해 주세요. ", invitee.getUserName(), userMapper.selectUserByNo(inviteeUserId).getUserName());
        try {
          smsService.sendMessage(invitee.getUserPhoneNo(), message);
          logger.info("초대 SMS 발송 성공: userNo={}, phone={}", inviteeUserId, invitee.getUserPhoneNo());
        } catch (Exception e) {
          logger.error("초대 SMS 발송 실패: userNo={}, phone={}", inviteeUserId, invitee.getUserPhoneNo(), e);
          // 필요 시 예외 처리 (예: 롤백 여부 결정)
        }
      } else {
        logger.warn("초대 SMS 발송 실패: userNo={}, phone={} (전화번호 없음)", inviteeUserId, invitee != null ? invitee.getUserPhoneNo() : "null");
      }
    }

    return savingProduct;
  }

  @Override
  @Transactional
  public void acceptInvitation(Integer invitationId, SavingsParticipationDTO participationDetails) {
    SavingsInvitationDTO invitation = savingsInvitationMapper.selectInvitationById(invitationId);
    if (invitation == null || !"PENDING".equals(invitation.getStatus())) {
      throw new RuntimeException("유효하지 않거나 이미 처리된 초대입니다.");
    }
    // 참여자 등록
    SavingsParticipationDTO participation = new SavingsParticipationDTO();
    participation.setSavingAccountNo(invitation.getSavingAccountNo());
    participation.setUserId(invitation.getInviteeUserId());
    participation.setStartDate(new Date());
    participation.setFamilyId(participationDetails.getFamilyId());
    participation.setTotalAmount(participationDetails.getAutoTransferAmount());
    participation.setAutoTransferDate(participationDetails.getAutoTransferDate());
    participation.setAutoTransferAmount(participationDetails.getAutoTransferAmount());
    participation.setAutoTransferSmsYn(participationDetails.getAutoTransferSmsYn());
    participation.setMaturitySmsYn(participationDetails.getMaturitySmsYn());
    participation.setSuccessfulTransfers(0);
    participation.setBonusApplied(false);
    participation.setUserAccountNo(participationDetails.getUserAccountNo());
    savingsParticipationMapper.insertSavingsParticipation(participation);

    // 초대 상태 업데이트
    savingsInvitationMapper.updateInvitationStatus(invitationId, "ACCEPTED");

    // 우대 이율 증가
    SavingProductDTO savingProduct = savingProductMapper.selectSavingProductByAccountNo(invitation.getSavingAccountNo());
    BigDecimal bonusIncrement = new BigDecimal("0.1");
    if (savingProduct.getBonusInterestRate() == null) {
      savingProduct.setBonusInterestRate(bonusIncrement);
    } else {
      savingProduct.setBonusInterestRate(savingProduct.getBonusInterestRate().add(bonusIncrement));
    }
    savingProductMapper.updateSavingProduct(savingProduct);

    // 초대한 사용자에게 SMS 알림
    UserDTO inviter = userMapper.selectUserByNo(invitation.getInviterUserId());
    UserDTO invitee = userMapper.selectUserByNo(invitation.getInviteeUserId());
    if (inviter != null && inviter.getUserPhoneNo() != null && !inviter.getUserPhoneNo().isEmpty()) {
      String message = String.format("안녕하세요 %s님, %s님이 당신의 함께 적금 초대를 수락했습니다.", inviter.getUserName(), invitee.getUserName());
      try {
        smsService.sendMessage(inviter.getUserPhoneNo(), message);
        logger.info("수락 SMS 발송 성공: inviterUserNo={}, phone={}", inviter.getUserNo(), inviter.getUserPhoneNo());
      } catch (Exception e) {
        logger.error("수락 SMS 발송 실패: inviterUserNo={}, phone={}", inviter.getUserNo(), inviter.getUserPhoneNo(), e);
      }
    }
  }

  @Override
  @Transactional
  public void declineInvitation(Integer invitationId) {
    SavingsInvitationDTO invitation = savingsInvitationMapper.selectInvitationById(invitationId);
    if (invitation == null || !"PENDING".equals(invitation.getStatus())) {
      throw new RuntimeException("유효하지 않거나 이미 처리된 초대입니다.");
    }

    // 초대 상태 업데이트
    savingsInvitationMapper.updateInvitationStatus(invitationId, "DECLINED");

    // 초대한 사용자에게 SMS 알림
    UserDTO inviter = userMapper.selectUserByNo(invitation.getInviterUserId());
    UserDTO invitee = userMapper.selectUserByNo(invitation.getInviteeUserId());
    if (inviter != null && inviter.getUserPhoneNo() != null && !inviter.getUserPhoneNo().isEmpty()) {
      String message = String.format("안녕하세요 %s님, %s님이 당신의 함께 적금 초대를 거절했습니다.", inviter.getUserName(), invitee.getUserName());
      try {
        smsService.sendMessage(inviter.getUserPhoneNo(), message);
        logger.info("거절 SMS 발송 성공: inviterUserNo={}, phone={}", inviter.getUserNo(), inviter.getUserPhoneNo());
      } catch (Exception e) {
        logger.error("거절 SMS 발송 실패: inviterUserNo={}, phone={}", inviter.getUserNo(), inviter.getUserPhoneNo(), e);
      }
    }
  }

  @Override
  @Transactional(readOnly = true)
  public List<SavingsInvitationDTO> getPendingInvitations(int inviteeUserId) {
    return savingsInvitationMapper.selectPendingInvitationsByInviteeUserId(inviteeUserId);
  }

  @Override
  @Transactional
  public void deposit(String savingAccountNo, Integer userNo, Integer amount) {
    // 적금 상품 조회
    SavingProductDTO savingProduct = savingProductMapper.selectSavingProductByAccountNo(savingAccountNo);

    // 상태 확인
    if (!"ACTIVE".equals(savingProduct.getSavingStatus())) {
      throw new RuntimeException("입금할 수 없는 상태입니다.");
    }

    // 목표 금액 확인
    if (savingProduct.getCurrentAmount() >= savingProduct.getGoalAmount()) {
      throw new RuntimeException("목표 금액을 이미 달성하였습니다.");
    }

    // 새로운 현재 금액 계산
    int newCurrentAmount = savingProduct.getCurrentAmount() + amount;

    // 목표 금액 초과 여부 확인
    if (newCurrentAmount > savingProduct.getGoalAmount()) {
      throw new RuntimeException("입금액이 목표 금액을 초과합니다.");
    }

    // 월 최대 납입금 확인
    List<SavingsTransactionDTO> transactions = savingsTransactionMapper.selectTransactionsBySavingAccountNo(savingAccountNo);
    int monthlyDepositTotal = transactions.stream()
        .filter(t -> isSameMonth(t.getTransactionDate(), new Date()))
        .mapToInt(SavingsTransactionDTO::getAmount)
        .sum();

    if (monthlyDepositTotal + amount > 1000000) {
      throw new RuntimeException("월 최대 납입금을 초과하였습니다.");
    }

    // 현재 금액 업데이트
    savingProduct.setCurrentAmount(newCurrentAmount);
    savingProductMapper.updateSavingProduct(savingProduct);

    // 거래 내역 추가
    SavingsTransactionDTO transaction = new SavingsTransactionDTO();
    transaction.setSavingAccountNo(savingAccountNo);
    transaction.setUserNo(userNo);
    transaction.setAmount(amount);
    transaction.setAfterAmount(newCurrentAmount);
    transaction.setTransactionDate(new Date());
    transaction.setTransactionType("DEPOSIT");
    savingsTransactionMapper.insertSavingsTransaction(transaction);

    // 목표 달성 여부 확인
    checkGoalAchievement(savingAccountNo);
  }

  private void applyBonusInterestRateIfEligible(SavingsParticipationDTO participation) {
    // 최소 유지 기간 계산
    SavingProductDTO savingProduct = savingProductMapper.selectSavingProductByAccountNo(participation.getSavingAccountNo());
    Calendar minMaintenanceDate = Calendar.getInstance();
    minMaintenanceDate.setTime(savingProduct.getStartDate());
    minMaintenanceDate.add(Calendar.MONTH, savingProduct.getMinDuration());

    // 참여자의 시작일로부터 최소 유지 기간이 지났는지 확인
    if (new Date().after(minMaintenanceDate.getTime()) && !participation.isBonusApplied()) {
      // 최소 유지 기간 동안 매월 자동이체를 성공적으로 했는지 확인
      if (participation.getSuccessfulTransfers() >= savingProduct.getMinDuration()) {
        // 우대 이율 적용
        BigDecimal bonusIncrement = new BigDecimal("0.1");
        if (savingProduct.getBonusInterestRate() == null) {
          savingProduct.setBonusInterestRate(bonusIncrement);
        } else {
          savingProduct.setBonusInterestRate(savingProduct.getBonusInterestRate().add(bonusIncrement));
        }
        savingProductMapper.updateSavingProduct(savingProduct);

        // 우대 이율 적용 여부 업데이트
        participation.setBonusApplied(true);
        savingsParticipationMapper.updateSavingsParticipation(participation);
      }
    }
  }

  @Override
  public void checkGoalAchievement(String savingAccountNo) {
    SavingProductDTO savingProduct = savingProductMapper.selectSavingProductByAccountNo(savingAccountNo);

    if (savingProduct.getCurrentAmount() >= savingProduct.getGoalAmount()) {
      // 최소 유지 기간 확인
      Calendar minMaintenanceDate = Calendar.getInstance();
      minMaintenanceDate.setTime(savingProduct.getStartDate());
      minMaintenanceDate.add(Calendar.MONTH, 3);

      if (new Date().after(minMaintenanceDate.getTime())) {
        // 상태 업데이트 및 해지 처리
        savingProduct.setSavingStatus("COMPLETED");
        savingProduct.setEndDate(new Date());
        savingProductMapper.updateSavingProduct(savingProduct);

        // 원금과 이자 지급 처리
        payoutSavings(savingProduct);
      } else {
        // 최소 유지 기간 이후 자동 해지 스케줄링 (Scheduler에서 처리)
      }
    }
  }


  private void payoutSavings(SavingProductDTO savingProduct) {
    // 이자 계산
    BigDecimal principal = new BigDecimal(savingProduct.getCurrentAmount());
    BigDecimal totalInterestRate = savingProduct.getInterestRate().add(savingProduct.getBonusInterestRate());

    long days = (savingProduct.getEndDate().getTime() - savingProduct.getStartDate().getTime()) / (1000 * 60 * 60 * 24);
    BigDecimal daysDecimal = new BigDecimal(days);

    BigDecimal interest = principal.multiply(totalInterestRate).multiply(daysDecimal).divide(new BigDecimal(36500), 2, BigDecimal.ROUND_HALF_UP);

    // 대표자 계좌로 입금 처리 (AccountService 필요)
    // accountService.transferToAccount(savingProduct.getRepresentativeAccountNo(), principal.add(interest));

    // 참여자에게 만기 SMS 발송
    List<SavingsParticipationDTO> participants = savingsParticipationMapper.selectParticipationBySavingAccountNo(savingProduct.getSavingAccountNo());
    for (SavingsParticipationDTO participant : participants) {
      if ("Y".equals(participant.getMaturitySmsYn())) {
        // SMS 발송 (NotificationService 필요)
        // notificationService.sendSms(participant.getUserId(), "적금이 만기되었습니다.");
      }
    }

    // 상태 업데이트
    savingProduct.setSavingStatus("TERMINATED");
    savingProductMapper.updateSavingProduct(savingProduct);
  }

  private boolean isSameMonth(Date date1, Date date2) {
    Calendar cal1 = Calendar.getInstance();
    cal1.setTime(date1);
    Calendar cal2 = Calendar.getInstance();
    cal2.setTime(date2);

    return (cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR)) &&
        (cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH));
  }

  @Override
  @Transactional
  public void processAutomaticTransfers() {
    List<SavingsParticipationDTO> participations = savingsParticipationMapper.selectAllParticipations();

    Calendar today = Calendar.getInstance();
    int todayDate = today.get(Calendar.DAY_OF_MONTH);

    for (SavingsParticipationDTO participation : participations) {
      if (participation.getAutoTransferDate() != null && participation.getAutoTransferAmount() != null) {
        if (participation.getAutoTransferDate() == todayDate) {
          try {
            deposit(participation.getSavingAccountNo(), participation.getUserId(), participation.getAutoTransferAmount());

            // 성공적인 자동이체 횟수 증가
            participation.setSuccessfulTransfers(participation.getSuccessfulTransfers() + 1);
            savingsParticipationMapper.updateSavingsParticipation(participation);

            // 우대 이율 적용 여부 확인
            applyBonusInterestRateIfEligible(participation);

            if ("Y".equals(participation.getAutoTransferSmsYn())) {
              // SMS 발송 (NotificationService 필요)
              logger.info("자동이체 완료: participationId={}, savingAccountNo={}", participation.getUserId(), participation.getSavingAccountNo());
              smsService.sendMessage(userMapper.selectUserByNo(participation.getUserId()).getUserPhoneNo(), "자동이체가 완료되었습니다.");
            }
          } catch (Exception e) {
            // 자동이체 실패 처리 (예: 잔액 부족)
            // 실패 알림 발송 등 추가 구현 가능
            logger.error("자동이체 실패: participationId={}, savingAccountNo={}", participation.getUserId(), participation.getSavingAccountNo(), e);
            smsService.sendMessage(userMapper.selectUserByNo(participation.getUserId()).getUserPhoneNo(), "자동이체가 실패하였습니다. 잔액을 확인해 주세요.");
          }
        }
      }
    }
  }

  @Override
  @Transactional
  public void processAutomaticTermination() {
    List<SavingProductDTO> savingProducts = savingProductMapper.selectAllSavingProducts();

    for (SavingProductDTO savingProduct : savingProducts) {
      if ("ACTIVE".equals(savingProduct.getSavingStatus()) && savingProduct.getCurrentAmount() >= savingProduct.getGoalAmount()) {
        // 최소 유지 기간 확인
        Calendar minMaintenanceDate = Calendar.getInstance();
        minMaintenanceDate.setTime(savingProduct.getStartDate());
        minMaintenanceDate.add(Calendar.MONTH, 3);

        if (new Date().after(minMaintenanceDate.getTime())) {
          // 상태 업데이트 및 해지 처리
          savingProduct.setSavingStatus("COMPLETED");
          savingProduct.setEndDate(new Date());
          savingProductMapper.updateSavingProduct(savingProduct);

          // 원금과 이자 지급 처리
          payoutSavings(savingProduct);
        }
      }
    }
  }

  // 가족의 함께 적금 리스트 조회
  @Override
  public List<SavingProductDTO> getFamilySavingsList(Integer familyId) {
    return savingProductMapper.getFamilySavingsList(familyId);
  }

  @Override
  public List<SavingsTransactionDTO> getTransactionHistory (String savingAccountNo) {
    return savingsTransactionMapper.selectTransactionsBySavingAccountNo(savingAccountNo);
  }

  @Override
  public List<SavingsParticipationDTO> getParticipationDetails(String savingAccountNo) {
    return savingsParticipationMapper.selectParticipationBySavingAccountNo(savingAccountNo);
  }

  @Override
  public SavingProductDTO getSavingProduct(String savingAccountNo) {
    return savingProductMapper.selectSavingProductByAccountNo(savingAccountNo);
  }
}
