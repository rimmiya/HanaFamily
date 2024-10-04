package kr.ac.kopo.hanafamily.savings.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import kr.ac.kopo.hanafamily.mydata.dto.AccountWithNameDTO;
import kr.ac.kopo.hanafamily.savings.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/savings/account")
public class AccountController {

  @Autowired
  private AccountService accountService;

  @GetMapping("/list")
  public List<AccountDTO> getAccountList(@RequestParam Integer userNo) {
    return accountService.findAccountByUserNo(userNo);
  }

  @GetMapping("/personal-list")
  public List<AccountWithNameDTO> getPersonalAccountList(@RequestParam Integer userNo) {
    return accountService.findAccountWithNameByPersonalUserNo(userNo);
  }

  @GetMapping("/family-list")
  public List<AccountWithNameDTO> getFamilyAccountList(@RequestParam Integer familyId) {
    return accountService.findAccountWithNameByFamilyId(familyId);
  }

  @GetMapping("/account-info")
  public AccountDTO getAccountInfo(@RequestParam String accountNo) {
    return accountService.findAccountByAccountNo(accountNo);
  }
}
