package kr.ac.kopo.hanafamily.savings.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepositRequestDTO {
  private String savingAccountNo; // SAVING_ACCOUNT_NO
  private Integer userNo;         // USER_NO
  private Integer amount;         // AMOUNT
}
