package kr.ac.kopo.hanafamily.mydata.dto;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsuranceWithNameDTO {
  private String insuranceId;                // INSURANCE_ID
  private String insuranceType;              // INSURANCE_TYPE
  private Double insuranceAmount;            // INSURANCE_AMOUNT
  private Date insuranceStartDate;           // INSURANCE_START_DATE
  private Date insuranceEndDate;             // INSURANCE_END_DATE
  private Integer insuranceTerm;             // INSURANCE_TERM
  private Integer insuranceState;            // INSURANCE_STATE
  private String insuranceRenewal;           // INSURANCE_RENEWAL
  private String insurancePaymentType;       // INSURANCE_PAYMENT_TYPE
  private String insurancePaymentCycle;      // INSURANCE_PAYMENT_CYCLE
  private Double insurancePaymentTotal;      // INSURANCE_PAYMENT_TOTAL
  private Date insurancePaymentDate;         // INSURANCE_PAYMENT_DATE
  private Integer userNo;                    // USER_NO
  private String userName;                   // USER_NAME
  private String insuranceCode;              // INSURANCE_CODE
  private String insuranceName;              // INSURANCE_NAME
  private String insuranceAccount;           // INSURANCE_ACCOUNT
  private String insuranceCompany;           // INSURANCE_COMPANY
  private Double insuranceMonthlyPayment;    // INSURANCE_MONTHLY_PAYMENT
}
