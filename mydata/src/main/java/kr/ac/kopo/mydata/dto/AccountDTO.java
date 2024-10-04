package kr.ac.kopo.mydata.dto;

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
  private String accountPassword;
  private Integer accountBalance;
  private Date createDate;
  private Integer accountStatus;
  private Integer bankCode;
  private Integer accountType;
  private Integer accountLimit;
  private Date accountExpireDate;
}
