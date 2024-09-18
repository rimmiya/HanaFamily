package kr.ac.kopo.hanafamily.savings.dto;

import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingProductDTO {
  private String savingAccountNo; // SAVING_ACCOUNT_NO
  private Integer userNo; // USER_NO
  private Integer goalAmount; // GOAL_AMOUNT
  private Integer currentAmount; // CURRENT_AMOUNT
  private Date startDate; // START_DATE
  private Date endDate; // END_DATE
  private BigDecimal interestRate; // INTEREST_RATE
  private BigDecimal bonusInterestRate; // BONUS_INTEREST_RATE
  private Integer minDuration; // MIN_DURATION
  private Integer maxDuration; // MAX_DURATION
  private String savingStatus; // SAVING_STATUS
  private Integer productId; // PRODUCT_ID
  private String representativeAccountNo; // 대표자 계좌번호
  private Integer familyId; // 가족 ID
  private Integer accountPassword; // 계좌 비밀번호
  private String accountName; // 계좌 이름
  private Integer bankCode; // 은행 코드
}
