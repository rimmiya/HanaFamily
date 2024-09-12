package kr.ac.kopo.hanafamily.mydata.controller;

import kr.ac.kopo.hanafamily.mydata.dto.MyDataRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MydataDTO;
import kr.ac.kopo.hanafamily.mydata.service.MyDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hanafamily/mydata")
public class MyDataController {

  @Autowired
  private MyDataService myDataService;
  @PostMapping("/request")
  public MydataDTO requestMyData(@RequestBody MyDataRequestDTO requestData) {
    // 요청을 보내는 로직
    MydataDTO response = myDataService.getmyDataList(requestData);

    return response;
  }
}