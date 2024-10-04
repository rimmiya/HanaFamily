package kr.ac.kopo.mydata.controller;

import java.util.List;
import kr.ac.kopo.mydata.dto.BankStatementDTO;
import kr.ac.kopo.mydata.dto.LoanDTO;
import kr.ac.kopo.mydata.dto.StockDTO;
import kr.ac.kopo.mydata.dto.TransactionDTO;
import kr.ac.kopo.mydata.dto.TransactionRequestDTO;
import kr.ac.kopo.mydata.dto.TransactionResponseDTO;
import kr.ac.kopo.mydata.service.MyDataService;
import kr.ac.kopo.mydata.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;


  @RequestMapping("/send")
  public TransactionResponseDTO requestTransaction(@RequestBody TransactionRequestDTO requestData) {

      TransactionResponseDTO response = new TransactionResponseDTO();

    List<BankStatementDTO> bankStatementList = transactionService.getBankTransactionData(requestData.getUserNo(), requestData.getAccountNo());
    List<TransactionDTO> transactionList = transactionService.getCardTransactionData(requestData.getUserNo(), requestData.getCardNo());
//    List<LoanDTO> loanList = transactionService.getLoanTransactionData(requestData.getUserNo(), requestData.getLoanId());
    List<StockDTO> stockList = transactionService.getSecurityTransactionData(requestData.getUserNo(), requestData.getSecurityAccount());

    response.setUserNo(requestData.getUserNo());
    response.setBankStatement(bankStatementList);
    response.setCardStatement(transactionList);
//    response.setLoanStatement(loanList);
    response.setStockStatement(stockList);

      return response;
  }
}
