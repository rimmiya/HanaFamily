package kr.ac.kopo.finance.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date transactionDate;
  private Integer transactionType;
  private Integer accountBalance;
  private Integer userNo;
  private Integer beforeBalance;
  private String location;
  private Integer category;
  private Integer transactionStatus;
}
