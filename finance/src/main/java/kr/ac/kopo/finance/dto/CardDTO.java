package kr.ac.kopo.finance.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {
  private String cardNo;
  private Integer userNo;
  private Integer passwd;
  private Date cardPeriod;
  private String cvc;
  private String cardUser;
  private String cardName;
  private String cardType;
  private Integer cardLimit;
  private Integer cardCode;
  private Integer cardBalance;
  private Integer cardProductCode;

}
