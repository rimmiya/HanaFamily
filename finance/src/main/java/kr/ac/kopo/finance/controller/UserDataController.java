package kr.ac.kopo.finance.controller;

import java.util.List;


import kr.ac.kopo.finance.dto.AccountDTO;
import kr.ac.kopo.finance.dto.CardDTO;
import kr.ac.kopo.finance.dto.InsuranceDTO;
import kr.ac.kopo.finance.dto.LoanDTO;
import kr.ac.kopo.finance.dto.SecurityDTO;
import kr.ac.kopo.finance.dto.finance.FinanceBankRequestDTO;
import kr.ac.kopo.finance.dto.finance.FinanceCardRequestDTO;
import kr.ac.kopo.finance.dto.finance.FinanceInsuranceRequestDTO;
import kr.ac.kopo.finance.dto.finance.FinanceLoanRequestDTO;
import kr.ac.kopo.finance.dto.finance.FinanceSecurityRequestDTO;
import kr.ac.kopo.finance.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/finance/get-user-data")
public class UserDataController {

  @Autowired
  private FinanceService financeService;

  @PostMapping("/bank")
  public List<AccountDTO> getBankAccounts(@RequestBody FinanceBankRequestDTO request) {
    return financeService.getBankAccountData(request.getUserNo(), request.getBankCode());
  }

  @PostMapping("/card")
  public List<CardDTO> getCardAccounts(@RequestBody FinanceCardRequestDTO request) {
    return financeService.getCardData(request.getUserNo(), request.getCardCode());
  }

  @PostMapping("/loan")
  public List<LoanDTO> getLoanAccounts(@RequestBody FinanceLoanRequestDTO request) {
    return financeService.getLoanAccountData(request.getUserNo(), request.getLoanBank());
  }

  @PostMapping("/security")
  public List<SecurityDTO> getSecurityAccounts(@RequestBody FinanceSecurityRequestDTO request) {
    return financeService.getSecurityData(request.getUserNo(), request.getSecurityCode());
  }

  @PostMapping("/insurance")
  public List<InsuranceDTO> getInsuranceAccounts(@RequestBody FinanceInsuranceRequestDTO request) {
    return financeService.getInsuranceData(request.getUserNo(), request.getInsuranceCode());
  }
}
