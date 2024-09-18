package kr.ac.kopo.hanafamily.user.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.user.domain.NotificationDTO;
import kr.ac.kopo.hanafamily.user.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping("/user")
  public ResponseEntity<List<NotificationDTO>> getUserNotifications(@RequestParam Integer userNo) {
    List<NotificationDTO> notifications = notificationService.getUserNotifications(userNo);
    return ResponseEntity.ok(notifications);
  }
}