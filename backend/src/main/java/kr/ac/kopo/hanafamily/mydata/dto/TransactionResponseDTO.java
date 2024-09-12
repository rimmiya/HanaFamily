package kr.ac.kopo.hanafamily.mydata.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionResponseDTO {
  private Integer userNo;
  private List<BankStatementDTO> bankStatement;
  private List<TransactionDTO> cardStatement;
  private List<StockDTO> stockStatement;
}
