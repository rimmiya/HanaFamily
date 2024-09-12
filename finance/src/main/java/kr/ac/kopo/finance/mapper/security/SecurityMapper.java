package kr.ac.kopo.finance.mapper.security;

import java.util.List;
import kr.ac.kopo.finance.dto.SecurityDTO;
import kr.ac.kopo.finance.dto.StockDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SecurityMapper {

  List<SecurityDTO> getSecurityData(@Param("userNo") Integer userNo, @Param("securityCode") String securityCode);

  List<StockDTO> getStockData(@Param("userNo") Integer userNo, @Param("securityAccount") String securityAccount);
}
