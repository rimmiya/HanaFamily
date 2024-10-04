package kr.ac.kopo.hanafamily.mydata.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date transactionDate;
  private Integer transactionType;
  private Integer accountBalance;
  private Integer userNo;
  private Integer beforeBalance;
  private String accountNoTo;
}
