package kr.ac.kopo.hanafamily.budget.service;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.BudgetDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;

public interface BudgetService {
  Integer getFamilyBudgetSumByMonth(Integer familyId, String month);  // 월별 예산 합 조회

  List<BudgetDTO> getBudgetByCategoryAndMonth(Integer familyId, String month);  // 월별 카테고리별 예산 조회

  List<TransactionDTO> getTransactionsByCategoryAndMonth(Integer familyId, Integer categoryId, String month);  // 월별 카테고리별 거래 내역 조회

  void updateBudgetByMonth(Integer familyId, String month, BudgetDTO budgetDTO);  // 월별 예산 수정

  void updateTransactionCategoryByMonth(Integer familyId, String month, TransactionDTO transactionDTO);  // 월별 거래 내역 카테고리 수정

  Integer getCurrentMonthExpenses(Integer familyId);  // 이번 달 지출 조회

  Integer getCurrentMonthIncome(Integer familyId);  // 이번 달 수입 조회

  List<TransactionDTO> getEmptyTransactionsByCategoryAndMonth(Integer familyId, Integer categoryId, String month);

  void updateEmptyTransactionCategoryByMonth(Integer familyId, String month, TransactionDTO transactionDTO);

  List<TransactionDTO> getTransactionsByMonth(Integer familyId, String month);

  List<BudgetDTO> getAverageTransactionsByCategory(Integer familyId, String month);
  void insertBudget(BudgetDTO budgetDTO);
}
