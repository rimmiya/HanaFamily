package kr.ac.kopo.finance.mapper;

import java.util.List;
import kr.ac.kopo.finance.dto.LoanDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoanMapper {
  List<LoanDTO> getLoanData(@Param("userNo") Integer userNo, @Param("loanCode") Integer loanCode);

}
