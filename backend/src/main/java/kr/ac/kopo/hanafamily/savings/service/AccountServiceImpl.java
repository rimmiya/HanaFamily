package kr.ac.kopo.hanafamily.savings.service;

import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
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
    savingProductMapper.updateSavingProduct(savingProduct);
  }
}
