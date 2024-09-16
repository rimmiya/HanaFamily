package kr.ac.kopo.hanafamily.savings.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavingsParticipationDTO {
  private String savingAccountNo; // SAVING_ACCOUNT_NO
  private Integer userId; // USER_ID
  private String userAccountNo; // USER_ACCOUNT_NO
  private Integer familyId; // FAMILY_ID
  private Date startDate; // START_DATE
  private Integer totalAmount; // TOTAL_AMOUNT
  private Integer autoTransferDate; // AUTO_TRANSFER_DATE (nullable)
  private Integer autoTransferAmount; // AUTO_TRANSFER_AMOUNT (nullable)
  private String autoTransferSmsYn; // AUTO_TRANSFER_SMS_YN
  private String maturitySmsYn; // MATURITY_SMS_YN
  private Integer successfulTransfers; // 성공적인 자동이체 횟수
  private boolean bonusApplied; // 우대 이율 적용 여부
}
