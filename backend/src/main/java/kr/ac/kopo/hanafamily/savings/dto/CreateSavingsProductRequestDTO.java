package kr.ac.kopo.hanafamily.savings.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateSavingsProductRequestDTO {
  private SavingProductDTO savingProduct;
  private List<Integer> inviteeUserIds;
  private CreateSavingsRequestDTO createSavingsRequest;
}