package kr.ac.kopo.hanafamily.savings.mapper;

import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper {
  AccountDTO findAccountByAccountNo(String accountNo);

  void updateAccount(AccountDTO account);
}