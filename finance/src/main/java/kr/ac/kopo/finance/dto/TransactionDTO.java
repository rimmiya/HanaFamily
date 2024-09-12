package kr.ac.kopo.finance.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
  private String transactionId;
  private String cardNo;
  private Integer transactionAmount;
  private Date transactionDate;
  private Integer transactionType;
  private Integer accountBalance;
  private Integer userNo;
  private Integer beforeBalance;
  private String location;
  private String category;
  private Integer transactionStatus;
}
