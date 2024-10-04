package kr.ac.kopo.hanafamily.user.controller;

import kr.ac.kopo.hanafamily.invitation.service.FamilyService;
import kr.ac.kopo.hanafamily.savings.mapper.AccountMapper;
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

  @Autowired
  private AccountMapper accountMapper;

  @GetMapping("/members")
  public FamilyMemberDTO getFamilyMembers(@Param("familyId") Integer familyId) {

    FamilyMemberDTO familyMemberDTO = familyService.getFamilyMembers(familyId);

    return familyMemberDTO;
  }

  @GetMapping("/members/without-me")
  public FamilyMemberDTO getFamilyMembersWithoutMe(@Param("familyId") Integer familyId, @Param("userNo") Integer userNo) {

    FamilyMemberDTO familyMemberDTO = familyService.getFamilyMembersWithoutMe(familyId, userNo);

    return familyMemberDTO;
  }

  @GetMapping("/no-members")
  public Integer getMyAccountBalance(@Param("userNo") Integer userNo) {
    return accountMapper.getMyAccountBalance(userNo);
  }

  @GetMapping("/account-balance")
  public Integer getFamilyAccountBalance(@Param("familyId") Integer familyId) {
    if (accountMapper.getFamilySavingsAccountBalance(familyId) != null) {
      return accountMapper.getFamilyAccountBalance(familyId) + accountMapper.getFamilySavingsAccountBalance(familyId);
    }
    return accountMapper.getFamilyAccountBalance(familyId);
  }
}
