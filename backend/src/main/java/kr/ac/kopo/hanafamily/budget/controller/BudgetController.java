package kr.ac.kopo.hanafamily.budget.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.BudgetDTO;
import kr.ac.kopo.hanafamily.budget.service.BudgetService;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

  @Autowired
  private BudgetService budgetService;

// 패밀리 ID와 월별로 전체 예산 합 조회
  @GetMapping("/family/{familyId}/sum/{month}")
  public Integer getFamilyBudgetSum(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("month") String month) {
    Integer sum = budgetService.getFamilyBudgetSumByMonth(familyId, month);
    return sum;
  }

  // 이번 달 지출 금액 조회 API
  @GetMapping("/family/{familyId}/expenses/current-month")
  public Integer getCurrentMonthExpenses(@PathVariable("familyId") Integer familyId) {
    return budgetService.getCurrentMonthExpenses(familyId);
  }

  // 이번 달 수입 금액 조회 API
  @GetMapping("/family/{familyId}/income/current-month")
  public Integer getCurrentMonthIncome(@PathVariable("familyId") Integer familyId) {
    return budgetService.getCurrentMonthIncome(familyId);
  }

  // 특정 패밀리와 카테고리별 월별 예산 조회
  @GetMapping("/family/{familyId}/category/month/{month}")
  public List<BudgetDTO> getBudgetByCategoryAndMonth(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("month") String month) {
    return budgetService.getBudgetByCategoryAndMonth(familyId, month);
  }
  // 특정 패밀리와 카테고리별 월별 거래 내역 조회
  @GetMapping("/family/{familyId}/category/{categoryId}/transactions/{month}")
  public List<TransactionDTO> getTransactionsByCategory(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("categoryId") Integer categoryId,
      @PathVariable("month") String month) {
    List<TransactionDTO> transactions = budgetService.getTransactionsByCategoryAndMonth(familyId, categoryId, month);
    return transactions;
  }

  // 특정 패밀리와 월별 거래 내역 조회
  @GetMapping("/family/{familyId}/transactions/{month}")
  public List<TransactionDTO> getTransactionsByCategory(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("month") String month) {
    List<TransactionDTO> transactions = budgetService.getTransactionsByMonth(familyId, month);
    return transactions;
  }

  // 예산 수정 (패밀리 ID와 월 포함)
  @PutMapping("/family/{familyId}/update/{month}")
  public void updateBudget(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("month") String month,
      @RequestBody BudgetDTO budgetDTO) {
    budgetService.updateBudgetByMonth(familyId, month, budgetDTO);
  }
  // 거래 내역 카테고리 수정 (패밀리 ID와 월 포함)
  @PutMapping("/family/{familyId}/update-category/{month}")
  public void updateTransactionCategory(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("month") String month,
      @RequestBody TransactionDTO transactionDTO) {
    budgetService.updateTransactionCategoryByMonth(familyId, month, transactionDTO);
  }

  // 이전 달의 카테고리별 소비내역 평균 값
  @GetMapping("/family/{familyId}/category/average/{month}")
  public List<BudgetDTO> getAverageTransactionsByCategory(
      @PathVariable("familyId") Integer familyId,
      @PathVariable("month") String month) {
    return budgetService.getAverageTransactionsByCategory(familyId, month);
  }

  @PostMapping("/category/insert")
  public void insertBudget(@RequestBody BudgetDTO budgetDTO) {
    budgetService.insertBudget(budgetDTO);
  }
}
