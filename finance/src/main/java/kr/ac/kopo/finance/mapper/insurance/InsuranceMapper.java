package kr.ac.kopo.finance.mapper.insurance;

import java.util.List;

import kr.ac.kopo.finance.dto.InsuranceDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InsuranceMapper {

  List<InsuranceDTO> getInsuranceData(@Param("userNo") Integer userNo, @Param("insuranceCode") String insuranceCode);
}
