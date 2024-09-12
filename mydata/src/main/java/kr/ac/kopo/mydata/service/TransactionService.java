package kr.ac.kopo.mydata.service;

import java.util.ArrayList;
import java.util.List;
import kr.ac.kopo.mydata.dto.AccountDTO;
import kr.ac.kopo.mydata.dto.BankStatementDTO;
import kr.ac.kopo.mydata.dto.CardDTO;
import kr.ac.kopo.mydata.dto.InsuranceDTO;
import kr.ac.kopo.mydata.dto.LoanDTO;
import kr.ac.kopo.mydata.dto.SecurityDTO;
import kr.ac.kopo.mydata.dto.StockDTO;
import kr.ac.kopo.mydata.dto.TransactionDTO;
import kr.ac.kopo.mydata.dto.TransactionRequestDTO;
import kr.ac.kopo.mydata.dto.TransactionResponseDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceBankRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceBankStatementDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceCardRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceInsuranceRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceLoanRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceSecurityRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceStockDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceTransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TransactionService {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${bank.transaction.url}")
  private String bankTransactionUrl;

  @Value("${card.transaction.url}")
  private String cardTransactionUrl;

  @Value("${security.transaction.url}")
  private String securityTransactionUrl;

  public List<BankStatementDTO> getBankTransactionData(Integer userNo, List<String> accountNoList) {

    List<BankStatementDTO> bankStatementList = new ArrayList<>();
    // 사용자의 은행 코드로 해당 계좌의 거래 내역 정보를 가져옴
    accountNoList.forEach(
        accountNo -> {
          HttpEntity<FinanceBankStatementDTO> request = new HttpEntity<>(new FinanceBankStatementDTO(
              userNo, accountNo));
          // List<AccountDTO> 타입의 응답을 받을 수 있도록 변경
          ResponseEntity<List<BankStatementDTO>> response = restTemplate.exchange(
              bankTransactionUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<BankStatementDTO>>() {}
          );
          bankStatementList.addAll(response.getBody());
        }
    );
    return bankStatementList;
  }

  public List<TransactionDTO> getCardTransactionData(Integer userNo, List<String> cardNoList) {

    List<TransactionDTO> cardTransactionList = new ArrayList<>();
    // 사용자의 카드 코드로 사용자의 카드 정보를 가져옴
    cardNoList.forEach(
        cardNo -> {
          HttpEntity<FinanceTransactionDTO> request = new HttpEntity<>(new FinanceTransactionDTO(
              userNo, cardNo));
          // List<CardDTO> 타입의 응답을 받을 수 있도록 변경
          ResponseEntity<List<TransactionDTO>> response = restTemplate.exchange(
              cardTransactionUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<TransactionDTO>>() {}
          );
          cardTransactionList.addAll(response.getBody());
        }
    );
    return cardTransactionList;
  }


  public List<StockDTO> getSecurityTransactionData(Integer userNo, List<String> securityAccountList) {

    List<StockDTO> stockList = new ArrayList<>();
    // 사용자의 증권 코드로 사용자의 증권 정보를 가져옴
    securityAccountList.forEach(
        securityAccount -> {
          HttpEntity<FinanceStockDTO> request = new HttpEntity<>(new FinanceStockDTO(
              userNo, securityAccount));
          // List<SecurityDTO> 타입의 응답을 받을 수 있도록 변경
          ResponseEntity<List<StockDTO>> response = restTemplate.exchange(
              securityTransactionUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<StockDTO>>() {}
          );
          stockList.addAll(response.getBody());
        }
    );
    return stockList;
  }

}
