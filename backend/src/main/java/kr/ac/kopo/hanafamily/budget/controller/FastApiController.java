package kr.ac.kopo.hanafamily.budget.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.service.FastApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fastapi/budget")
public class FastApiController {
  private final FastApiService fastApiService;

  public FastApiController(FastApiService fastApiService) {
    this.fastApiService = fastApiService;
  }

  // FastAPI로 GET 요청 전송
  @GetMapping("/family/{familyId}/auto-classify/{selectedMonth}")
  public ResponseEntity<?> autoClassifyTransactions(@PathVariable("familyId") Integer familyId,
      @PathVariable("selectedMonth") String month) {

    // Step 1: 서비스 호출하여 예측 및 거래 업데이트
    List<Integer> updatedCategories = fastApiService.predictCategoriesForEmptyTransactions(familyId, month);

    // Step 2: 프론트엔드에 200 상태 응답 반환
    return ResponseEntity.ok("Transactions updated with categories: " + updatedCategories);
  }
}
