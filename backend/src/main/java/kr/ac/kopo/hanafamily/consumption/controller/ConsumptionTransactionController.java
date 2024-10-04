package kr.ac.kopo.hanafamily.consumption.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.consumption.dto.ConsumptionTransactionDTO;
import kr.ac.kopo.hanafamily.consumption.service.ConsumptionTransactionService;
import kr.ac.kopo.hanafamily.mydata.dto.BankStatementDTO;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import kr.ac.kopo.hanafamily.savings.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transactions")
public class ConsumptionTransactionController {

  @Autowired
  private ConsumptionTransactionService consumptionTransactionService;

  @Autowired
  private AccountMapper accountMapper;

  @GetMapping("/income")
  public List<BankStatementDTO> getIncomeByFamilyId(@RequestParam("familyId") Integer familyId) {
    return accountMapper.getIncomeByFamilyId(familyId);
  }

  @GetMapping("/by-account-no")
  public List<BankStatementDTO> getTransactionsByAccountNo(@RequestParam("accountNo") String accountNo) {
    return accountMapper.getTransactionByAccountNo(accountNo);
  }

  // 특정 사용자의 소비 내역 조회 API
  @GetMapping("/family")
  public List<ConsumptionTransactionDTO> getFamilyTransactions(@RequestParam("familyId") Integer familyId) {
    List<TransactionDTO> transactions = consumptionTransactionService.getFamilyTransactions(familyId);
    List<LoanDTO> loans = consumptionTransactionService.getFamilyLoan(familyId);
    List<InsuranceDTO> insurances = consumptionTransactionService.getFamilyInsurance(familyId);
    return List.of(new ConsumptionTransactionDTO(familyId, transactions, loans, insurances));
  }


}
