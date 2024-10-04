package kr.ac.kopo.hanafamily.mydata.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountWithNameDTO {
  private String accountNo;
  private Integer userNo;
  private String userName;
  private String accountName;
  private String accountPassword;
  private Integer accountBalance;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createDate;
  private Integer accountStatus;
  private Integer bankCode;
  private Integer accountType;
  private Integer accountLimit;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date accountExpireDate;
}
