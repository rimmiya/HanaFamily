package kr.ac.kopo.finance.dto.finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceBankRequestDTO {
  private Integer userNo;
  private Integer bankCode;
}
