package kr.ac.kopo.mydata.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsuranceDTO {
  private String insuranceId;          // 보험 ID
  private String insuranceType;        // 보험 유형
  private Integer insuranceAmount;     // 보험 금액
  private Date insuranceStartDate;     // 보험 가입 날짜
  private Date insuranceEndDate;       // 보험 종료일
  private Integer insuranceTerm;       // 보험 기간
  private Integer insuranceState;      // 보험 상태
  private String insuranceRenewal;     // 보험 갱신 여부
  private String insurancePaymentType; // 보험 납입 구분
  private String insurancePaymentCycle;// 보험 납입 주기
  private Integer insurancePaymentTotal; // 보험 총 납입횟수
  private Date insurancePaymentDate;   // 보험 납입일
  private Integer userNo;              // 사용자 번호 (외래키)
  private String insuranceCode;        // 보험 코드
  private String insuranceName;        // 보험 이름
  private String insuranceAccount;     // 보험 계좌
  private String insuranceCompany;     // 보험 회사
}