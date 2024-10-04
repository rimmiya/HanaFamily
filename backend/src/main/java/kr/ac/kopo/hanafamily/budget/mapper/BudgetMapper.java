package kr.ac.kopo.hanafamily.budget.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.BudgetDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BudgetMapper {

  Integer getFamilyBudgetSumByMonth(@Param("familyId") Integer familyId, @Param("month") String month);

  List<BudgetDTO> getBudgetByCategoryAndMonth(@Param("familyId") Integer familyId, @Param("month") String month);

  List<TransactionDTO> getTransactionsByCategoryAndMonth(@Param("familyId") Integer familyId, @Param("categoryId") Integer categoryId, @Param("month") String month);

  void updateBudgetByMonth(@Param("familyId") Integer familyId, @Param("month") String month, @Param("budgetDTO") BudgetDTO budgetDTO);

  void updateTransactionCategoryByMonth(@Param("familyId") Integer familyId, @Param("month") String month, @Param("transactionDTO") TransactionDTO transactionDTO);

  Integer getCurrentMonthExpenses(@Param("familyId") Integer familyId);

  Integer getCurrentMonthIncome(@Param("familyId") Integer familyId);

  // familyId로 해당 family에 속한 userNo 목록 조회
  List<Integer> getUserNosByFamilyId(@Param("familyId") Integer familyId);

  // userNo 목록을 이용해 월별 카테고리가 없는 거래 내역 조회
  List<TransactionDTO> getEmptyCategoryTransactionsByUserNosAndMonth(
      @Param("userNos") List<Integer> userNos,
      @Param("month") String month
  );

  // 거래 내역의 카테고리 업데이트
  void updateTransactionCategory(@Param("transactionId") String transactionId, @Param("category") Integer category);

  List<TransactionDTO> getTransactionsByMonth(@Param("familyId") Integer familyId, @Param("month") String month);

  List<BudgetDTO> getMonthlyCategoryAvgExpenses(@Param("familyId") Integer familyId, @Param("month") String month);
  void insertAvgBudget(BudgetDTO budgetDTO);

  void insertBudget(BudgetDTO budgetDTO);
}
