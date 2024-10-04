package kr.ac.kopo.hanafamily.consumption.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import kr.ac.kopo.hanafamily.consumption.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  // 특정 사용자의 소비 내역 조회 API
  @GetMapping("/family")
  public List<TransactionDTO> getFamilyTransactions(@RequestParam("familyId") Integer familyId) {
    return transactionService.getFamilyTransactions(familyId);
  }
}
