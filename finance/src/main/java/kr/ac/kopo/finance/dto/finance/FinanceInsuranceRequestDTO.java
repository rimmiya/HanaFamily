package kr.ac.kopo.finance.dto.finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinanceInsuranceRequestDTO {
  private Integer userNo;
  private String insuranceCode;
}
