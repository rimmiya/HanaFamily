package kr.ac.kopo.hanafamily.mydata.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestWrapperDTO {
  private TransactionRequestDTO requestData;
  private MydataDTO myDataDTO;
}
