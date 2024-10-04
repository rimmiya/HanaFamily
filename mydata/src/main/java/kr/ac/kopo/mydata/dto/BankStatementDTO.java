package kr.ac.kopo.mydata.dto;

import java.math.BigDecimal;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankStatementDTO {
  private BigDecimal transactionNo;
  private String accountNo;
  private Integer transactionAmount;
  private Date transactionDate;
  private String transactionType;
  private Integer accountBalance;
  private String userNo;
  private Integer beforeBalance;
  private String accountNoTo;
}
