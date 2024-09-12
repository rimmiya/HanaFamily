package kr.ac.kopo.mydata.dto.finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinanceTransactionDTO {
  private Integer userNo;
  private String cardNo;
}
