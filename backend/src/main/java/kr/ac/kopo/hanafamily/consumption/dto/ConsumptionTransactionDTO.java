package kr.ac.kopo.hanafamily.consumption.dto;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsumptionTransactionDTO {
  private Integer familyId;
  private List<TransactionDTO> transactions;
  private List<LoanDTO> loans;
  private List<InsuranceDTO> insurances;
}
