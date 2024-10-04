package kr.ac.kopo.hanafamily.mydata.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.LoanWithNameDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoanMapper {
  List<LoanWithNameDTO> getLoanWithNamePersonalData(Integer userNo);
  List<LoanWithNameDTO> getLoanWithNameFamilyData(Integer familyId);
}
