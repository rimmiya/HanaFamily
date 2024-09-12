package kr.ac.kopo.finance.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SecurityDTO {
  private String securityId;           // 증권 ID
  private String securityAccount;      // 증권 계좌
  private String securityName;         // 증권 이름
  private Integer securityBalance;     // 증권 잔액
  private String securityType;         // 증권 유형
  private Date securityDate;           // 증권 날짜
  private Integer securityState;       // 증권 상태
  private Integer userNo;              // 사용자 번호 (외래키)
  private String securityCode;         // 증권 코드
  private Integer securityRate;        // 증권 이자율
  private Integer securityInterest;    // 증권 이자
  private String securityBank;         // 증권 은행
}
