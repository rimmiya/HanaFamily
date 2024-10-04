package kr.ac.kopo.finance.dto.finance;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FinanceLoanDTO {
  private String loanId;
  private Integer userNo; // Assuming USER_NO corresponds to the user number (Long type)
}
