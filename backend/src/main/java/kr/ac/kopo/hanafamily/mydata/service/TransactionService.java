package kr.ac.kopo.hanafamily.mydata.service;

import kr.ac.kopo.hanafamily.mydata.dto.TransactionRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class TransactionService {
  @Autowired
  private RestTemplate restTemplate;

  @Value("${transaction.server.url}")
  private String transactionServerUrl;

  public TransactionResponseDTO getTransactionList (TransactionRequestDTO requestData) {
    HttpEntity<TransactionRequestDTO> request = new HttpEntity<>(requestData);
    ResponseEntity<TransactionResponseDTO> response = restTemplate.postForEntity(transactionServerUrl, request, TransactionResponseDTO.class);
    return response.getBody();
  }
}