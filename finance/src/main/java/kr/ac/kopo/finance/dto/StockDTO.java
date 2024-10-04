package kr.ac.kopo.hanafamily.mydata.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockDTO {
  private String stockId;              // 주식 ID
  private String stockType;            // 주식 유형
  private Integer stockCount;          // 주식 수량
  private Integer stockAmount;         // 주식 매입 단가
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date stockDate;              // 주식 날짜
  private Integer stockState;          // 주식 상태
  private Integer userNo;              // 사용자 번호 (외래키)
  private String stockCode;            // 주식 코드
  private String stockName;            // 주식 이름
  private Integer stockBalance;        // 주식 잔액
  private String securityAccount;      // 주식 계좌
  private String securityCode;         // 증권 코드

}
