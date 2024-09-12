package kr.ac.kopo.mydata.dto.finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceStockDTO {
  private Integer userNo;
  private String securityAccount;
}
