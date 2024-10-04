package kr.ac.kopo.mydata.controller;

import java.util.List;
import kr.ac.kopo.mydata.dto.AccountDTO;
import kr.ac.kopo.mydata.dto.CardDTO;
import kr.ac.kopo.mydata.dto.InsuranceDTO;
import kr.ac.kopo.mydata.dto.LoanDTO;
import kr.ac.kopo.mydata.dto.MyDataRequestDTO;
import kr.ac.kopo.mydata.dto.MydataDTO;
import kr.ac.kopo.mydata.dto.SecurityDTO;
import kr.ac.kopo.mydata.service.MyDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mydata")
public class MyDataController {

  @Autowired
  private MyDataService myDataService;

  @PostMapping("/send")
  public MydataDTO getData(@RequestBody MyDataRequestDTO requestData) {

    MydataDTO mydataDTO = new MydataDTO();

    List<AccountDTO> accountList = myDataService.getBankAccountData(requestData.getUserNo(), requestData.getBankCode());
    List<CardDTO> cardList = myDataService.getCardData(requestData.getUserNo(), requestData.getCardCode());
    List<LoanDTO> loanList = myDataService.getLoanData(requestData.getUserNo(), requestData.getLoanBank());
    List<InsuranceDTO> insuranceList = myDataService.getInsuranceData(requestData.getUserNo(), requestData.getInsuranceCode());
    List<SecurityDTO> securityList = myDataService.getSecurityData(requestData.getUserNo(), requestData.getSecurityCode());

    mydataDTO.setUserNo(requestData.getUserNo());
    mydataDTO.setAccount(accountList);
    mydataDTO.setCard(cardList);
    mydataDTO.setLoan(loanList);
    mydataDTO.setInsurance(insuranceList);
    mydataDTO.setSecurity(securityList);

    return mydataDTO;
  }
}
