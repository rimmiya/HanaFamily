package kr.ac.kopo.finance.mapper.bank;

import java.util.List;

import kr.ac.kopo.finance.dto.AccountDTO;
import kr.ac.kopo.finance.dto.BankStatementDTO;
import kr.ac.kopo.finance.dto.LoanDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BankMapper {
  List<AccountDTO> getBankAccountData(@Param("userNo") Integer userNo, @Param("bankCode") Integer bankCode);
  List<LoanDTO> getLoanData(@Param("userNo") Integer userNo, @Param("loanBank") String loanBank);

  List<BankStatementDTO> getBankStatementData(@Param("userNo") Integer userNo, @Param("accountNo") String accountNo);

  List<LoanDTO> getLoanTransactionData(@Param("userNo") Integer userNo, @Param("loanId") String loanId);
}
