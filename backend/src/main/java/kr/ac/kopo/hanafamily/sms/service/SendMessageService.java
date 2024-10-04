package kr.ac.kopo.hanafamily.sms.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.mybatis.logging.Logger;
import org.mybatis.logging.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SendMessageService {
  private static final Logger logger = LoggerFactory.getLogger(SendMessageService.class);

  final DefaultMessageService messageService;

//  @Value("${coolSMS.api.key}")
  private String apiKey="NCSWXELQBBIFHHLP";

//  @Value("${coolSMS.api.secret}")
  private String apiSecret="IFTIDF1RT7ITB3BWMBEW9Y4WKLIPK5P2";

//  @Value("${coolSMS.api.url}")
  private String apiUrl="https://api.coolsms.co.kr";

  public SendMessageService(){
    this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, apiUrl);
  }
  public void sendMessage(String to, String text){
    Message message = new Message();
    message.setFrom("01082076120"); // 01012345678 형태여야 함.
    message.setTo("01073604760"); // 01012345678 형태여야 함.
    message.setText(text);
    SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
    System.out.println(response);
  }
}