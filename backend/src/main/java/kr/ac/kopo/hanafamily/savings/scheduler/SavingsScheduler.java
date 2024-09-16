package kr.ac.kopo.hanafamily.savings.scheduler;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.SavingProductDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsParticipationDTO;
import kr.ac.kopo.hanafamily.savings.mapper.SavingProductMapper;
import kr.ac.kopo.hanafamily.savings.mapper.SavingsParticipationMapper;
import kr.ac.kopo.hanafamily.savings.service.SavingsService;
import kr.ac.kopo.hanafamily.sms.service.SendMessageService;
import kr.ac.kopo.hanafamily.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SavingsScheduler {

  @Autowired
  private SavingsService savingsService;

  @Autowired
  private SendMessageService sendMessageService;

  @Autowired
  private SavingProductMapper savingProductMapper;

  @Autowired
  private SavingsParticipationMapper savingsParticipationMapper;

  @Autowired
  private UserMapper userMapper;

  /**
   * 만기 7일 전 알림 스케줄러
   * 매일 10시에 만기 7일 전인 상품에 대해 알림 전송
   */
  @Scheduled(cron = "0 0 10 * * *")  // 매일 10시 실행
  public void sendMaturityReminderSms() {
    List<SavingProductDTO> savingsProducts = savingProductMapper.selectAllSavingProducts();

    Date today = new Date();
    Calendar calendar = Calendar.getInstance();

    for (SavingProductDTO product : savingsProducts) {
      calendar.setTime(product.getEndDate());
      calendar.add(Calendar.DAY_OF_MONTH, -7);  // 만기일 7일 전

      // 오늘이 만기 7일 전인 상품만 처리
      if (calendar.getTime().equals(today) && "ACTIVE".equals(product.getSavingStatus())) {
        // 참여자들에게 만기 7일 전 알림 전송
        List<SavingsParticipationDTO> participants = savingsParticipationMapper.selectParticipationBySavingAccountNo(product.getSavingAccountNo());

        for (SavingsParticipationDTO participant : participants) {
          if ("Y".equals(participant.getMaturitySmsYn())) {
            String phoneNumber = userMapper.getPhoneNumberByNo(participant.getUserId());
            sendMessageService.sendMessage(phoneNumber, "적금 상품이 만기 7일 전입니다. 준비해 주세요.");
          }
        }
      }
    }
  }

  /**
   * 상품 만기 시 알림 스케줄러
   * 매일 10시에 만기일이 지난 상품에 대해 알림 전송
   */
  @Scheduled(cron = "0 0 10 * * *")  // 매일 10시 실행
  public void sendMaturitySms() {
    List<SavingProductDTO> savingsProducts = savingProductMapper.selectAllSavingProducts();

    Date today = new Date();

    for (SavingProductDTO product : savingsProducts) {
      if (product.getEndDate().before(today) && "ACTIVE".equals(product.getSavingStatus())) {
        // 만기 처리
        savingsService.processAutomaticTermination();  // 만기 처리는 기존 프로세스를 재사용

        // 참여자들에게 만기 알림 전송
        List<SavingsParticipationDTO> participants = savingsParticipationMapper.selectParticipationBySavingAccountNo(product.getSavingAccountNo());

        for (SavingsParticipationDTO participant : participants) {
          if ("Y".equals(participant.getMaturitySmsYn())) {
            String phoneNumber = userMapper.getPhoneNumberByNo(participant.getUserId());
            sendMessageService.sendMessage(phoneNumber, "적금 상품이 만기되었습니다. 확인해 주세요.");
          }
        }
      }
    }
  }


  /**
   * 자동이체 처리 스케줄러
   * 매일 0시에 자동이체를 처리
   */
  @Scheduled(cron = "0 0 0 * * *")  // 매일 자정에 실행
  public void scheduleAutomaticTransfers() {
    savingsService.processAutomaticTransfers();
  }
}
