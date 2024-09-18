package kr.ac.kopo.hanafamily.user.service;

import java.util.ArrayList;
import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.MyDataStatusDTO;
import kr.ac.kopo.hanafamily.mydata.mapper.MyDataMapper;
import kr.ac.kopo.hanafamily.savings.dto.SavingsInvitationDTO;
import kr.ac.kopo.hanafamily.savings.mapper.SavingsInvitationMapper;
import kr.ac.kopo.hanafamily.user.domain.NotificationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

  @Autowired
  private MyDataMapper myDataMapper; // tb_mydata와 상호작용하는 매퍼

  @Autowired
  private SavingsInvitationMapper savingsInvitationMapper; // TB_SAVINGS_INVITATION과 상호작용하는 매퍼

  public List<NotificationDTO> getUserNotifications(Integer userNo) {
    List<NotificationDTO> notifications = new ArrayList<>();

    // tb_mydata에서 유저 정보가 없거나 status가 0인 경우 알림 추가
    MyDataStatusDTO myData = myDataMapper.selectMyDataConnection(userNo);
    if (myData == null || myData.getMyDataStatus() == 0) {
      notifications.add(new NotificationDTO("자산 연결", "자산을 연결해 주세요.", "family_invitation", null, null));
    }

    // TB_SAVINGS_INVITATION에서 초대 상태가 pending인 경우 알림 추가
    List<SavingsInvitationDTO> pendingInvitations = savingsInvitationMapper.selectPendingInvitationsByInviteeUserId(userNo);
    for (SavingsInvitationDTO invitation : pendingInvitations) {
      notifications.add(new NotificationDTO("적금 초대", "함께 적금 초대를 수락해 주세요.", "savings_invitation", invitation.getInvitationId(), invitation.getSavingAccountNo()));
    }

    return notifications;
  }
}
