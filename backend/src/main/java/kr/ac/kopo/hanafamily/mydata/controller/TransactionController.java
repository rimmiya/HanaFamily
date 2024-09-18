package kr.ac.kopo.hanafamily.mydata.controller;

import kr.ac.kopo.hanafamily.mydata.dto.MydataDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionRequestWrapperDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionResponseDTO;
import kr.ac.kopo.hanafamily.mydata.mapper.MyDataMapper;
import kr.ac.kopo.hanafamily.mydata.service.MyDataService;
import kr.ac.kopo.hanafamily.mydata.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hanafamily/transaction")
public class TransactionController {

  @Autowired
  private TransactionService transactionService;

  @Autowired
  private MyDataService myDataService;

  @Autowired
  private MyDataMapper myDataMapper;

  @RequestMapping("/request")
  public TransactionResponseDTO requestTransaction(@RequestBody TransactionRequestWrapperDTO transactionRequestWrapperDTO) {

    TransactionRequestDTO requestData = transactionRequestWrapperDTO.getRequestData();
    MydataDTO myDataDTO = transactionRequestWrapperDTO.getMyDataDTO();
    // requestData로 받은 정보를 가지고 backend 디비에 저장하는 로직
    myDataService.saveAssets(requestData, myDataDTO);

    TransactionResponseDTO response = transactionService.getTransactionList(requestData);

    myDataService.saveTransactionData(response);
    myDataMapper.updateMyDataConnectionStatus(myDataDTO.getUserNo());
    return response;
  }

}
