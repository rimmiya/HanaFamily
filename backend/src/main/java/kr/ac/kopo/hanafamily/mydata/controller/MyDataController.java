package kr.ac.kopo.hanafamily.mydata.controller;

import kr.ac.kopo.hanafamily.mydata.dto.MyDataRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MydataDTO;
import kr.ac.kopo.hanafamily.mydata.service.MyDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/hanafamily/mydata")
public class MyDataController {

  @Autowired
  private MyDataService myDataService;
  @PostMapping("/request")
  public ResponseEntity<?> myData(@RequestBody MyDataRequestDTO requestData) {
    // 요청을 보내는 로직
    ResponseEntity<?> response = myDataService.getmyDataList(requestData);

    return ResponseEntity.ok(response.getBody());
  }
}