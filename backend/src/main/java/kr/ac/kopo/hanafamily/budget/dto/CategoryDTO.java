package kr.ac.kopo.hanafamily.budget.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
  private Integer categoryId;        // CATEGORY_ID
  private String categoryName;       // CATEGORY_NAME
  private String categoryType;       // CATEGORY_TYPE (예: 수입, 지출 등)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createdAt;       // CREATED_AT (기본값 SYSTIMESTAMP)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date updatedAt;       // UPDATED_AT (기본값 SYSTIMESTAMP)
}
