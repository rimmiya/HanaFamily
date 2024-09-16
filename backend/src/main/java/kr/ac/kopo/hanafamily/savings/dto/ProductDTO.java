package kr.ac.kopo.hanafamily.savings.dto;

import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
  private Integer productId; // PRODUCT_ID
  private String productName; // PRODUCT_NAME
  private BigDecimal baseInterestRate; // BASE_INTEREST_RATE
  private BigDecimal bonusInterestRate; // BONUS_INTEREST_RATE
  private Integer minDuration; // MIN_DURATION
  private Integer maxDuration; // MAX_DURATION
  private Integer minDeposit; // MIN_DEPOSIT
  private Integer maxDeposit; // MAX_DEPOSIT
  private Integer maxMonthlyDeposit; // MAX_MONTHLY_DEPOSIT
  private String productDescription; // PRODUCT_DESCRIPTION
  private Date createdDate; // CREATED_DATE
  private Date updatedDate; // UPDATED_DATE
}
