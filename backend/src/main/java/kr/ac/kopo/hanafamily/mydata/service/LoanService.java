package kr.ac.kopo.hanafamily.mydata.service;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.LoanWithNameDTO;
import kr.ac.kopo.hanafamily.mydata.mapper.LoanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanService {

  @Autowired
  private LoanMapper loanMapper;

  public List<LoanWithNameDTO> getLoanWithNamePersonalData(Integer userNo) {
    // 대출 정보를 가져옴
    return loanMapper.getLoanWithNamePersonalData(userNo);
  }

  public List<LoanWithNameDTO> getLoanWithNameFamilyData(Integer familyId) {
    // 가
    return loanMapper.getLoanWithNameFamilyData(familyId);
  }
}
