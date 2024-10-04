package kr.ac.kopo.hanafamily.savings.service;

import java.sql.Date;
import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import kr.ac.kopo.hanafamily.mydata.dto.AccountWithNameDTO;
import kr.ac.kopo.hanafamily.mydata.dto.BankStatementDTO;
import kr.ac.kopo.hanafamily.mydata.mapper.MyDataMapper;
import kr.ac.kopo.hanafamily.savings.dto.SavingProductDTO;
import kr.ac.kopo.hanafamily.savings.mapper.AccountMapper;
import kr.ac.kopo.hanafamily.savings.mapper.SavingProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountServiceImpl implements AccountService {

  @Autowired
  private AccountMapper accountMapper;

  @Autowired
  private SavingProductMapper savingProductMapper;

  @Autowired
  private MyDataMapper myDataMapper;

  @Override
  @Transactional
  public void transferFromUserAccountToSavings(String userAccountNo, String savingAccountNo, Integer amount) {
    // 사용자의 계좌 조회
    AccountDTO userAccount = accountMapper.findAccountByAccountNo(userAccountNo);
    if (userAccount == null) {
      throw new RuntimeException("사용자 계좌를 찾을 수 없습니다.");
    }

    // 사용자의 계좌 잔액 확인
    if (userAccount.getAccountBalance() < amount) {
      throw new RuntimeException("사용자의 계좌 잔액이 부족합니다.");
    }

    BankStatementDTO bankStatement = new BankStatementDTO();
    bankStatement.setAccountNo(userAccount.getAccountNo());
    bankStatement.setTransactionAmount(amount);
    bankStatement.setTransactionDate(new Date(System.currentTimeMillis()));
    bankStatement.setTransactionType(2);
    bankStatement.setAccountBalance(userAccount.getAccountBalance() - amount);
    bankStatement.setUserNo(userAccount.getUserNo());
    bankStatement.setBeforeBalance(userAccount.getAccountBalance());
    bankStatement.setAccountNoTo(savingAccountNo);

    myDataMapper.insertBankStatement(userAccount.getUserNo(), bankStatement);

    // 사용자의 계좌에서 금액 차감
    userAccount.setAccountBalance(userAccount.getAccountBalance() - amount);
    accountMapper.updateAccount(userAccount);


    // 적금 계좌 조회
    SavingProductDTO savingProduct = savingProductMapper.selectSavingProductByAccountNo(savingAccountNo);
    if (savingProduct == null) {
      throw new RuntimeException("적금 계좌를 찾을 수 없습니다.");
    }

    // 적금 계좌에 금액 추가
    savingProduct.setCurrentAmount(savingProduct.getCurrentAmount() + amount);
    savingProductMapper.updateSavingProduct(savingProduct );

    // 적금 계좌에 입금 내역 추가
    savingProductMapper.insertSavingProductIntoTransaction(amount, savingProduct);
  }

  @Override
  public List<AccountDTO> findAccountByUserNo(Integer userNo) {
    return accountMapper.findAccountByUserNo(userNo);
  }

  @Override
  public List<AccountWithNameDTO> findAccountWithNameByFamilyId(Integer familyId) {
    return accountMapper.findAccountWithNameByFamilyId(familyId);
  }

  @Override
  public AccountDTO findAccountByAccountNo(String accountNo) {
    return accountMapper.findAccountByAccountNo(accountNo);
  }

  @Override
  public List<AccountWithNameDTO> findAccountWithNameByPersonalUserNo(Integer userNo) {
    return accountMapper.findAccountWithNameByPersonalUserNo(userNo);
  }
}
