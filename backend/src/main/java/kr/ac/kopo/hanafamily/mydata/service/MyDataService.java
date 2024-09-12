package kr.ac.kopo.hanafamily.mydata.service;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import kr.ac.kopo.hanafamily.mydata.dto.CardDTO;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MyDataRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MydataDTO;
import kr.ac.kopo.hanafamily.mydata.dto.SecurityDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionResponseDTO;
import kr.ac.kopo.hanafamily.mydata.mapper.MyDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MyDataService {

  @Autowired
  private RestTemplate restTemplate;

  @Value("${mydata.server.url}")
  private String externalServerUrl;

  @Autowired
  private MyDataMapper myDataMapper;

  public MydataDTO getmyDataList (MyDataRequestDTO requestData) {
    HttpEntity<MyDataRequestDTO> request = new HttpEntity<>(requestData);
    ResponseEntity<MydataDTO> response = restTemplate.postForEntity(externalServerUrl, request, MydataDTO.class);
    return response.getBody();
  }

  // 계좌 리스트에서 accountNo와 일치하는 AccountDTO 찾기
  public AccountDTO findAccountByAccountNo(List<AccountDTO> accountDTOList, String accountNo) {
    return accountDTOList.stream()
        .filter(accountDTO -> accountDTO.getAccountNo().equals(accountNo))
        .findFirst()
        .orElse(new AccountDTO());// 첫 번째로 일치하는 항목을 반환
  }

  public CardDTO findCardByCardNo(List<CardDTO> cardDTOList, String cardNo) {
    return cardDTOList.stream()
        .filter(cardDTO -> cardDTO.getCardNo().equals(cardNo))
        .findFirst()
        .orElse(new CardDTO());// 첫 번째로 일치하는 항목을 반환
  }

  public LoanDTO findLoanByLoanId(List<LoanDTO> loanDTOList, String loanId) {
    return loanDTOList.stream()
        .filter(loanDTO -> loanDTO.getLoanId().equals(loanId))
        .findFirst()
        .orElse(new LoanDTO());// 첫 번째로 일치하는 항목을 반환
  }

  public InsuranceDTO findInsuranceByInsuranceId(List<InsuranceDTO> insuranceDTOList, String insuranceId) {
    return insuranceDTOList.stream()
        .filter(insuranceDTO -> insuranceDTO.getInsuranceId().equals(insuranceId))
        .findFirst()
        .orElse(new InsuranceDTO());// 첫 번째로 일치하는 항목을 반환
  }

  public SecurityDTO findSecurityBySecurityAccount(List<SecurityDTO> securityDTOList, String securityAccount) {
    return securityDTOList.stream()
        .filter(securityDTO -> securityDTO.getSecurityAccount().equals(securityAccount))
        .findFirst()
        .orElse(new SecurityDTO());// 첫 번째로 일치하는 항목을 반환
  }

  public void saveAssets(TransactionRequestDTO requestData, MydataDTO myDataDTO) {
    // requestData로 받은 정보를 가지고 backend 디비에 저장하는 로직
    if (requestData.getAccountNo() != null) {
      // logic to save the assets data
      requestData.getAccountNo().forEach(accountNo -> {
        // accountNo를 가진 계좌에 대한 정보를 myDataDTO에서 가져와서 저장
        AccountDTO accountDTO = findAccountByAccountNo(myDataDTO.getAccount(), accountNo);

        myDataMapper.insertMyDataAccounts(requestData.getUserNo(),
            accountDTO);
      });
    }
    if (requestData.getCardNo() != null) {
      // logic to save the assets data
      requestData.getCardNo().forEach(cardNo -> {
        CardDTO cardDTO = findCardByCardNo(myDataDTO.getCard(), cardNo);
        myDataMapper.insertMyDataCards(requestData.getUserNo(), cardDTO);
      });
    }
    if (requestData.getLoanId() != null) {
      // logic to save the assets data
      requestData.getLoanId().forEach(loanId -> {
        LoanDTO loanDTO = findLoanByLoanId(myDataDTO.getLoan(), loanId);
        myDataMapper.insertMyDataLoans(requestData.getUserNo(), loanDTO);
      });
    }
    if (requestData.getInsuranceId() != null) {
      // logic to save the assets data
      requestData.getInsuranceId().forEach(insuranceId -> {
        InsuranceDTO insuranceDTO = findInsuranceByInsuranceId(myDataDTO.getInsurance(), insuranceId);
        myDataMapper.insertMyDataInsurances(requestData.getUserNo(), insuranceDTO);
      });
    }
    if (requestData.getSecurityAccount() != null) {
      // logic to save the assets data
      requestData.getSecurityAccount().forEach(securityAccount -> {
        SecurityDTO securityDTO = findSecurityBySecurityAccount(myDataDTO.getSecurity(), securityAccount);
        myDataMapper.insertMyDataSecurities(requestData.getUserNo(), securityDTO);
      });
    }
  }

  public void saveTransactionData(TransactionResponseDTO transactionResponseDTO) {
    // logic to save the transaction data
    if (transactionResponseDTO.getBankStatement() != null) {
      // logic to save the transaction data
      transactionResponseDTO.getBankStatement().forEach(bankStatementDTO -> myDataMapper.insertBankStatement(transactionResponseDTO.getUserNo(), bankStatementDTO));
    }
    if (transactionResponseDTO.getCardStatement() != null) {
      // logic to save the transaction data
      transactionResponseDTO.getCardStatement().forEach(cardStatementDTO -> myDataMapper.insertCardStatement(transactionResponseDTO.getUserNo(), cardStatementDTO));
    }
    if (transactionResponseDTO.getStockStatement() != null) {
      // logic to save the transaction data
      transactionResponseDTO.getStockStatement().forEach(stockDTO -> myDataMapper.insertStockStatement(transactionResponseDTO.getUserNo(), stockDTO));
    }

  }
}
