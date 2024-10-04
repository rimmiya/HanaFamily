package kr.ac.kopo.hanafamily.savings.service;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import kr.ac.kopo.hanafamily.mydata.dto.AccountWithNameDTO;

public interface AccountService {
  void transferFromUserAccountToSavings(String userAccountNo, String savingAccountNo, Integer amount);

  List<AccountDTO> findAccountByUserNo(Integer userNo);
  List<AccountWithNameDTO> findAccountWithNameByFamilyId(Integer familyId);
  AccountDTO findAccountByAccountNo(String accountNo);
  List<AccountWithNameDTO> findAccountWithNameByPersonalUserNo(Integer userNo);
}
