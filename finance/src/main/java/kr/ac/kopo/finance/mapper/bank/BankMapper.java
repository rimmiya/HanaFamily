package kr.ac.kopo.finance.mapper.bank;

import java.util.List;
import kr.ac.kopo.finance.dto.AccountDTO;
import kr.ac.kopo.finance.dto.BankStatementDTO;
import kr.ac.kopo.finance.dto.LoanDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface BankMapper {
  List<AccountDTO> getBankAccountData(@Param("userNo") Integer userNo, @Param("bankCode") Integer bankCode);
  List<LoanDTO> getLoanData(@Param("userNo") Integer userNo, @Param("loanCode") String loanCode);

  List<BankStatementDTO> getBankStatementData(@Param("userNo") Integer userNo, @Param("accountNo") String accountNo);
}
