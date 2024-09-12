package kr.ac.kopo.finance.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
  private String accountNo;
  private Integer userNo;
  private String accountName;
  private Integer accountPassword;
  private Integer accountBalance;
  private Date createDate;
  private Integer accountStatus;
  private Integer bankCode;
  private Integer accountType;
  private Integer accountLimit;
  private Date accountExpireDate;
}
