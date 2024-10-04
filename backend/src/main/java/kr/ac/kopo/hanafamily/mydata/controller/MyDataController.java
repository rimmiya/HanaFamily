package kr.ac.kopo.hanafamily.mydata.controller;

import kr.ac.kopo.hanafamily.mydata.dto.MyDataRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MydataDTO;
import kr.ac.kopo.hanafamily.mydata.service.MyDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

  @GetMapping("/connection-status")
  public ResponseEntity<Integer> getMyDataConnectionStatus(@RequestParam Integer userNo) {
    Integer status = myDataService.getMyDataConnectionStatus(userNo);
    return ResponseEntity.ok((status != null) ? status : 0);
  }


}