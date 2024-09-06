package kr.ac.kopo.hanafamily.mydata.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyDataRequestDTO {
  private Integer userNo;
  private List<Integer> bankCode;
  private List<Integer> cardCode;
  private List<String> loanCode;
  private List<String> insuranceCode;
  private List<String> securityCode;
}
