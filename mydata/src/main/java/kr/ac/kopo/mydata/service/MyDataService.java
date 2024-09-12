package kr.ac.kopo.mydata.service;

import java.util.ArrayList;
import java.util.List;
import kr.ac.kopo.mydata.dto.AccountDTO;
import kr.ac.kopo.mydata.dto.CardDTO;
import kr.ac.kopo.mydata.dto.InsuranceDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceBankRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceCardRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceInsuranceRequestDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceLoanRequestDTO;
import kr.ac.kopo.mydata.dto.LoanDTO;
import kr.ac.kopo.mydata.dto.SecurityDTO;
import kr.ac.kopo.mydata.dto.finance.FinanceSecurityRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MyDataService {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${bank.data.url}")
  private String bankDataUrl;

  @Value("${card.data.url}")
  private String cardDataUrl;

  @Value("${loan.data.url}")
  private String loanDataUrl;

  @Value("${security.data.url}")
  private String securityDataUrl;

  @Value("${insurance.data.url}")
  private String insuranceDataUrl;

  public List<AccountDTO> getBankAccountData(Integer userNo, List<Integer> bankCodeList) {

    List<AccountDTO> accountList = new ArrayList<>();
    // 사용자의 은행 코드로 사용자의 계좌 정보를 가져옴
    bankCodeList.forEach(
        bankCode -> {
          HttpEntity<FinanceBankRequestDTO> request = new HttpEntity<>(new FinanceBankRequestDTO(
              userNo, bankCode));
          // List<AccountDTO> 타입의 응답을 받을 수 있도록 변경
          ResponseEntity<List<AccountDTO>> response = restTemplate.exchange(
              bankDataUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<AccountDTO>>() {}
          );
          accountList.addAll(response.getBody());
        }
    );

    return accountList;
  }

  public List<CardDTO> getCardData(Integer userNo, List<Integer> cardCodeList) {

    List<CardDTO> cardList = new ArrayList<>();
    // 사용자의 카드 정보로 사용자의 카드 정보를 가져옴
    cardCodeList.forEach(
        cardCode -> {
          HttpEntity<FinanceCardRequestDTO> request = new HttpEntity<>(new FinanceCardRequestDTO(
              userNo, cardCode));
          // List<CardDTO> 타입의 응답을 받을 수 있도록 변경
          ResponseEntity<List<CardDTO>> response = restTemplate.exchange(
              cardDataUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<CardDTO>>() {}
          );
          cardList.addAll(response.getBody());  // 받은 리스트의 데이터를 합쳐서 처리
        }
    );

    return cardList;
  }

  public List<LoanDTO> getLoanData(Integer userNo, List<String> loanCodeList) {

    List<LoanDTO> loanList = new ArrayList<>();
    // 사용자의 대출 정보로 사용자의 대출 정보를 가져옴
    loanCodeList.forEach(
        loanCode -> {
          HttpEntity<FinanceLoanRequestDTO> request = new HttpEntity<>(new FinanceLoanRequestDTO(
              userNo, loanCode));
          ResponseEntity<List<LoanDTO>> response = restTemplate.exchange(
              loanDataUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<LoanDTO>>() {}
          );
          loanList.addAll(response.getBody());  // 받은 리스트의 데이터를 합쳐서 처리
        }
    );

    return loanList;
  }

  public List<SecurityDTO> getSecurityData(Integer userNo, List<String> securityCodeList) {

    List<SecurityDTO> securityList = new ArrayList<>();
    // 사용자의 증권 정보로 사용자의 증권 정보를 가져옴
    securityCodeList.forEach(
        securityCode -> {
          HttpEntity<FinanceSecurityRequestDTO> request = new HttpEntity<>(new FinanceSecurityRequestDTO(
              userNo, securityCode));
          ResponseEntity<List<SecurityDTO>> response = restTemplate.exchange(
              securityDataUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<SecurityDTO>>() {}
          );
          securityList.addAll(response.getBody());  // 받은 리스트의 데이터를 합쳐서 처리
        }
    );

    return securityList;
  }

  public List<InsuranceDTO> getInsuranceData(Integer userNo, List<String> insuranceCodeList) {

    List<InsuranceDTO> insuranceList = new ArrayList<>();
    // 사용자의 보험 정보로 사용자의 보험 정보를 가져옴
    insuranceCodeList.forEach(
        insuranceCode -> {
          HttpEntity<FinanceInsuranceRequestDTO> request = new HttpEntity<>(new FinanceInsuranceRequestDTO(
              userNo, insuranceCode));
          ResponseEntity<List<InsuranceDTO>> response = restTemplate.exchange(
              insuranceDataUrl, HttpMethod.POST, request, new ParameterizedTypeReference<List<InsuranceDTO>>() {}
          );
          insuranceList.addAll(response.getBody());  // 받은 리스트의 데이터를 합쳐서 처리
        }
    );

    return insuranceList;
  }
}
