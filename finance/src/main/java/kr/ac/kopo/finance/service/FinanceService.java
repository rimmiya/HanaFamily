package kr.ac.kopo.finance.service;

import java.util.List;
import kr.ac.kopo.finance.dto.AccountDTO;
import kr.ac.kopo.finance.dto.CardDTO;
import kr.ac.kopo.finance.dto.InsuranceDTO;
import kr.ac.kopo.finance.dto.LoanDTO;
import kr.ac.kopo.finance.dto.SecurityDTO;
import kr.ac.kopo.finance.mapper.bank.BankMapper;
import kr.ac.kopo.finance.mapper.card.CardMapper;
import kr.ac.kopo.finance.mapper.insurance.InsuranceMapper;
import kr.ac.kopo.finance.mapper.security.SecurityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinanceService {

  @Autowired
  private BankMapper bankMapper;

  @Autowired
  private CardMapper cardMapper;

  @Autowired
  private SecurityMapper securityMapper;

  @Autowired
  private InsuranceMapper insuranceMapper;

  public List<AccountDTO> getBankAccountData(Integer userNo, Integer bankCode) {
    // 사용자의 은행 코드로 사용자의 계좌 정보를 가져옴
    return bankMapper.getBankAccountData(userNo, bankCode);
  }

  public List<CardDTO> getCardData(Integer userNo, Integer cardCode) {
    // 사용자의 카드 코드로 사용자의 카드 정보를 가져옴
    return cardMapper.getCardData(userNo, cardCode);
  }

  public List<LoanDTO> getLoanAccountData(Integer userNo, String loanCode) {
    // 사용자의 대출 코드로 사용자의 대출 정보를 가져옴
    return bankMapper.getLoanData(userNo, loanCode);
  }

  public List<SecurityDTO> getSecurityData(Integer userNo, String securityCode) {
    // 사용자의 증권 코드로 사용자의 증권 정보를 가져옴
    return securityMapper.getSecurityData(userNo, securityCode);
  }

  public List<InsuranceDTO> getInsuranceData(Integer userNo, String insuranceCode) {
//    insuranceMapper.getInsuranceData(userNo, insuranceCode);
    // 사용자의 보험 코드로 사용자의 보험 정보를 가져옴
    return insuranceMapper.getInsuranceData(userNo, insuranceCode);
  }
}
