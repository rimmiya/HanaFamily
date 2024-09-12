package kr.ac.kopo.mydata.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestDTO {
  private Integer userNo;
  private List<String> accountNo;
  private List<String> cardNo;
//  private List<String> loanNo;
  private List<String> securityAccount;
}
