package kr.ac.kopo.finance.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MydataDTO {
  private Integer userNo;
  private List<AccountDTO> account;
  private List<CardDTO> card;
  private List<LoanDTO> loan;
}
