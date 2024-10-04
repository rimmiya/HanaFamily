package kr.ac.kopo.finance.controller;

import java.util.List;

import kr.ac.kopo.finance.dto.BankStatementDTO;
import kr.ac.kopo.finance.dto.LoanDTO;
import kr.ac.kopo.finance.dto.StockDTO;
import kr.ac.kopo.finance.dto.TransactionDTO;
import kr.ac.kopo.finance.dto.finance.FinanceBankStatementDTO;
import kr.ac.kopo.finance.dto.finance.FinanceLoanDTO;
import kr.ac.kopo.finance.dto.finance.FinanceStockDTO;
import kr.ac.kopo.finance.dto.finance.FinanceTransactionDTO;
import kr.ac.kopo.finance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/finance/get-user-transaction")
public class TransactionDataController {

  @Autowired
  private TransactionService transactionService;

  @PostMapping("/bank")
  public List<BankStatementDTO> getBankStatement(@RequestBody FinanceBankStatementDTO request) {
    return transactionService.getBankStatementData(request.getUserNo(), request.getAccountNo());
  }

  @PostMapping("/card")
  public List<TransactionDTO> getCardTransaction(@RequestBody FinanceTransactionDTO request) {
    return transactionService.getCardTransactionData(request.getUserNo(), request.getCardNo());
  }

  @PostMapping("/security")
  public List<StockDTO> getSecurityTransaction(@RequestBody FinanceStockDTO request) {
    return transactionService.getSecurityTransactionData(request.getUserNo(), request.getSecurityAccount());
  }

//  @PostMapping("/loan")
//  public List<LoanDTO> getLoanTransactionData(@RequestBody FinanceLoanDTO request) {
//    return transactionService.getLoanTransactionData(request.getUserNo(), request.getLoanId());
//  }
}
