package kr.ac.kopo.hanafamily.savings.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSavingsRequestDTO {
  private Integer initialDepositAmount;
  private Integer autoTransferDate;
  private Integer autoTransferAmount;
  private String autoTransferSmsYn;
  private String maturitySmsYn;
  private String userAccountNo;
}
