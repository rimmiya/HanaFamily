package kr.ac.kopo.finance.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyDataRequestDTO {
  private Integer userNo;
  private List<Integer> bankCode;
  private List<Integer> cardCode;
  private List<String> loanCode;
}
