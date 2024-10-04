package kr.ac.kopo.hanafamily.budget.service;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.BudgetDTO;
import kr.ac.kopo.hanafamily.budget.mapper.BudgetMapper;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BudgetServiceImpl implements BudgetService {
  @Autowired
  private BudgetMapper budgetMapper;

  @Override
  public Integer getFamilyBudgetSumByMonth(Integer familyId, String month) {
    return budgetMapper.getFamilyBudgetSumByMonth(familyId, month);
  }

  @Override
  public List<BudgetDTO> getBudgetByCategoryAndMonth(Integer familyId, String month) {
    return budgetMapper.getBudgetByCategoryAndMonth(familyId, month);
  }

  @Override
  public List<TransactionDTO> getTransactionsByCategoryAndMonth(Integer familyId, Integer categoryId, String month) {
    return budgetMapper.getTransactionsByCategoryAndMonth(familyId, categoryId, month);
  }

  @Override
  public void updateBudgetByMonth(Integer familyId, String month, BudgetDTO budgetDTO) {
    budgetMapper.updateBudgetByMonth(familyId, month, budgetDTO);
  }

  @Override
  public void updateTransactionCategoryByMonth(Integer familyId, String month, TransactionDTO transactionDTO) {
    budgetMapper.updateTransactionCategoryByMonth(familyId, month, transactionDTO);
  }

  @Override
  public Integer getCurrentMonthExpenses(Integer familyId) {
    return budgetMapper.getCurrentMonthExpenses(familyId);
  }

  @Override
  public Integer getCurrentMonthIncome(Integer familyId) {
    return budgetMapper.getCurrentMonthIncome(familyId);
  }

  @Override
  public List<TransactionDTO> getEmptyTransactionsByCategoryAndMonth(Integer familyId, Integer categoryId, String month) {
    if (categoryId == null) {
      // Step 1: familyId로 userNo 목록을 조회한 후, 해당 userNo들의 빈 카테고리 거래 내역을 조회
      List<Integer> userNos = budgetMapper.getUserNosByFamilyId(familyId);
      return budgetMapper.getEmptyCategoryTransactionsByUserNosAndMonth(userNos, month);
    }
    return budgetMapper.getTransactionsByCategoryAndMonth(familyId, categoryId, month);
  }

  @Override
  public void updateEmptyTransactionCategoryByMonth(Integer familyId, String month, TransactionDTO transactionDTO) {
    // Step 6: 거래 내역 업데이트
    budgetMapper.updateTransactionCategory(transactionDTO.getTransactionId(), transactionDTO.getCategory());
  }

  @Override
  public List<TransactionDTO> getTransactionsByMonth(Integer familyId, String month) {
    return budgetMapper.getTransactionsByMonth(familyId, month);
  }

  @Override
  public  List<BudgetDTO> getAverageTransactionsByCategory(Integer familyId, String month) {
// 1. 3개월 간의 카테고리별 평균 예산 계산
    List<BudgetDTO> budgetDTOS = budgetMapper.getMonthlyCategoryAvgExpenses(familyId, month);

    // 2. 각 카테고리별로 해당 월의 실제 소비 내역을 계산
    for (BudgetDTO budgetDTO : budgetDTOS) {
      // 해당 카테고리의 실제 소비 금액을 계산
      double actualAmount = budgetMapper.getTransactionsByCategoryAndMonth(familyId, budgetDTO.getCategoryId(), month.substring(5))
          .stream()
          .mapToDouble(TransactionDTO::getTransactionAmount)
          .sum();

      budgetDTO.setActualAmount(actualAmount);

      // 3. TB_BUDGET 테이블에 예산과 실제 소비 금액 삽입
      budgetMapper.insertAvgBudget(budgetDTO);
    }

    // 4. 최종적으로 해당 월의 카테고리별 예산 리스트 반환
    return budgetMapper.getBudgetByCategoryAndMonth(familyId, month.substring(5));
  }

  @Override
  public void insertBudget(BudgetDTO budgetDTO) {
    budgetMapper.insertBudget(budgetDTO);
  }
}
