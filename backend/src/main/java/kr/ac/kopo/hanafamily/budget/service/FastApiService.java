package kr.ac.kopo.hanafamily.budget.service;

import java.util.List;
import java.util.stream.Collectors;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import kr.ac.kopo.hanafamily.budget.dto.PredictRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class FastApiService {
  private final WebClient webClient;

  @Autowired
  private BudgetService budgetService;

  public FastApiService() {
    this.webClient = WebClient.create("http://127.0.0.1:8000");  // FastAPI 서버 주소
  }

  public List<Integer> predictCategoriesForEmptyTransactions(Integer familyId, String month) {
    // Step 1: familyId로 빈 카테고리 거래 내역 조회
    List<TransactionDTO> emptyCategoryTransactions = budgetService.getEmptyTransactionsByCategoryAndMonth(familyId, null, month);

    // Step 2: 거래 내역의 location 정보를 추출하여 FastAPI로 전송
    List<String> transactionLocations = emptyCategoryTransactions.stream()
        .map(TransactionDTO::getLocation)  // assuming the 'location' field exists in TransactionDTO
        .collect(Collectors.toList());

    // Step 3: FastAPI 요청을 위한 PredictRequest 생성
    PredictRequest request = new PredictRequest(transactionLocations);

    // Step 4: FastAPI 호출을 통해 카테고리 예측
    Mono<List<Integer>> response = this.webClient.post()
        .uri("/fastapi/predict/")
        .bodyValue(request)
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<Integer>>() {});

    // Step 5: 예측 결과를 동기적으로 기다림 (block 사용)
    List<Integer> predictedCategories = response.block();

    // Step 6: 예측된 카테고리로 거래 내역 업데이트
    for (int i = 0; i < emptyCategoryTransactions.size(); i++) {
      TransactionDTO transaction = emptyCategoryTransactions.get(i);
      transaction.setCategory(predictedCategories.get(i));  // Set the predicted category
      budgetService.updateEmptyTransactionCategoryByMonth(familyId, month, transaction);  // DB 업데이트
    }

    // Step 7: 예측된 카테고리 리스트 반환 (로깅 또는 다른 용도)
    return predictedCategories;
  }
}
