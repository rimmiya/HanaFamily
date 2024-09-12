package kr.ac.kopo.hanafamily.mydata.dto;

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
  private List<String> loanId;
  private List<String> insuranceId;
  private List<String> securityAccount;
}
