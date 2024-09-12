package kr.ac.kopo.mydata.dto.finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinanceCardRequestDTO {
  private Integer userNo;
  private Integer cardCode;
}
