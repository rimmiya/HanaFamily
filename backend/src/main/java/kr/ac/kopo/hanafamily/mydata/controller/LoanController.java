package kr.ac.kopo.hanafamily.mydata.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.LoanWithNameDTO;
import kr.ac.kopo.hanafamily.mydata.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mydata/loan")
public class LoanController {

  @Autowired
  private LoanService loanService;

  @GetMapping("/personal-list")
  public List<LoanWithNameDTO> getLoanWithNamePersonalData(@RequestParam Integer userNo) {
    return loanService.getLoanWithNamePersonalData(userNo);
  }

  @GetMapping("/family-list")
  public List<LoanWithNameDTO> getLoanWithNameFamilyData(@RequestParam Integer familyId) {
    return loanService.getLoanWithNameFamilyData(familyId);
  }

}