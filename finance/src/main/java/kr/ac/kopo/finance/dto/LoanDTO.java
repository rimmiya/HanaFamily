package kr.ac.kopo.hanafamily.mydata.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {
  private String loanId;
  private String loanType;
  private Integer loanAmount;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date loanDate;
  private Integer loanState;
  private Integer loanTerm;
  private Integer userNo;
  private String loanCode;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date loanEndDate;
  private String loanName;
  private Integer loanRate;
  private Integer loanBalance;
  private Integer loanInterest;
  private String loanAccount;
  private String loanBank;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date loanRepaymentDate;
  private Integer loanMonthlyPayment;
}
