package kr.ac.kopo.hanafamily.mydata.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceWithNameDTO;
import kr.ac.kopo.hanafamily.mydata.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mydata/insurance")
public class InsuranceController {

  @Autowired
  private InsuranceService insuranceService;

  @GetMapping("/personal-list")
  public List<InsuranceWithNameDTO> getInsuranceWithNamePersonalData(@RequestParam Integer userNo) {
    return insuranceService.getInsuranceWithNamePersonalData(userNo);
  }

  @GetMapping("/family-list")
  public List<InsuranceWithNameDTO> getInsuranceWithNameFamilyData(@RequestParam Integer familyId) {
    return insuranceService.getInsuranceWithNameFamilyData(familyId);
  }
}
