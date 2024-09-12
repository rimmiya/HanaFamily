package kr.ac.kopo.finance.service;

import java.util.List;
import kr.ac.kopo.finance.dto.BankStatementDTO;
import kr.ac.kopo.finance.dto.StockDTO;
import kr.ac.kopo.finance.dto.TransactionDTO;
import kr.ac.kopo.finance.mapper.bank.BankMapper;
import kr.ac.kopo.finance.mapper.card.CardMapper;
import kr.ac.kopo.finance.mapper.security.SecurityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

  @Autowired
  private BankMapper bankMapper;

  @Autowired
  private CardMapper cardMapper;

  @Autowired
  private SecurityMapper securityMapper;

  public List<BankStatementDTO> getBankStatementData (Integer userNo, String accountNo) {
    return bankMapper.getBankStatementData(userNo, accountNo);
  }

  public List<TransactionDTO> getCardTransactionData (Integer userNo, String cardNo) {
    return cardMapper.getTransactionData(userNo, cardNo);
  }

  public List<StockDTO> getSecurityTransactionData (Integer userNo, String securityAccount) {
    return securityMapper.getStockData(userNo, securityAccount);
  }
}
