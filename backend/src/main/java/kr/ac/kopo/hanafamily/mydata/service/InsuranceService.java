package kr.ac.kopo.hanafamily.mydata.service;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceWithNameDTO;
import kr.ac.kopo.hanafamily.mydata.mapper.InsuranceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceService {

  @Autowired
  private InsuranceMapper insuranceMapper;

  public List<InsuranceWithNameDTO> getInsuranceWithNamePersonalData(Integer userNo) {
    // 대출 정보를 가져옴
    return insuranceMapper.getInsurancePersonalData(userNo);
  }

  public List<InsuranceWithNameDTO> getInsuranceWithNameFamilyData(Integer familyId) {
    // 가
    return insuranceMapper.getInsuranceFamilyData(familyId);
  }

}
