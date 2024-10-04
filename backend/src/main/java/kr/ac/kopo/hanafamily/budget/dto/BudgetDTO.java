package kr.ac.kopo.hanafamily.budget.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDTO {
  private Integer budgetId;          // BUDGET_ID
  private Integer familyId;          // FAMILY_ID
  private Integer categoryId;        // CATEGORY_ID
  private String categoryName;  // 추가된 필드
  private Double budgetAmount;       // BUDGET_AMOUNT
  private Double actualAmount;       // ACTUAL_AMOUNT (기본값 0)
  private Double eventAmount;        // EVENT_AMOUNT (기본값 0)
//  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date startDate;       // START_DATE
//  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date endDate;         // END_DATE
  private String budgetStatus;       // BUDGET_STATUS (기본값 'ACTIVE')
//  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createdAt;       // CREATED_AT (기본값 SYSTIMESTAMP)
//  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date updatedAt;       // UPDATED_AT (기본값 SYSTIMESTAMP)
}
