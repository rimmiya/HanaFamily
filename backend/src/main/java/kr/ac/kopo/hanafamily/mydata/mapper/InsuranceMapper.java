package kr.ac.kopo.hanafamily.mydata.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceWithNameDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InsuranceMapper {

  List<InsuranceWithNameDTO> getInsurancePersonalData(Integer userNo);
  List<InsuranceWithNameDTO> getInsuranceFamilyData(Integer familyId);
}
