package kr.ac.kopo.mydata.dto;

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
  private Date loanDate;
  private Integer loanState;
  private Integer loanTerm;
  private Integer userNo;
  private String loanCode;
  private Date loanEndDate;
  private String loanName;
  private Integer loanRate;
  private Integer loanBalance;
  private Integer loanInterest;
  private String loanAccount;
  private String loanBank;
}
