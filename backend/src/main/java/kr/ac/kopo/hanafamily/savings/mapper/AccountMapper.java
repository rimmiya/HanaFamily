package kr.ac.kopo.hanafamily.savings.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import kr.ac.kopo.hanafamily.mydata.dto.AccountWithNameDTO;
import kr.ac.kopo.hanafamily.mydata.dto.BankStatementDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {
  AccountDTO findAccountByAccountNo(String accountNo);

  void updateAccount(AccountDTO account);

  List<BankStatementDTO> getIncomeByAccountNo(String accountNo);
  List<BankStatementDTO> getTransactionByAccountNo(String accountNo);

  List<BankStatementDTO> getIncomeByFamilyId(Integer familyId);

  List<AccountDTO> findAccountByUserNo(Integer userNo);
  List<AccountWithNameDTO> findAccountWithNameByFamilyId(Integer familyId);

  Integer getMyAccountBalance(Integer userNo);
  Integer getFamilyAccountBalance(Integer familyId);
  Integer getFamilySavingsAccountBalance(Integer familyId);

  List<AccountWithNameDTO> findAccountWithNameByPersonalUserNo(Integer userNo);

}