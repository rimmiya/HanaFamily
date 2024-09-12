package kr.ac.kopo.hanafamily.user.controller;

import kr.ac.kopo.hanafamily.invitation.service.FamilyService;
import kr.ac.kopo.hanafamily.user.domain.FamilyMemberDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/family")
public class FamilyController {

  @Autowired
  private FamilyService familyService;

  @GetMapping("/members")
  public FamilyMemberDTO getFamilyMembers(@Param("familyId") Integer familyId) {

    FamilyMemberDTO familyMemberDTO = familyService.getFamilyMembers(familyId);

    return familyMemberDTO;
  }
}
