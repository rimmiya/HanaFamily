package kr.ac.kopo.hanafamily.mydata.service;

import kr.ac.kopo.hanafamily.mydata.dto.MyDataRequestDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MydataDTO;
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

  public ResponseEntity<?> getmyDataList (MyDataRequestDTO requestData) {
    HttpEntity<MyDataRequestDTO> request = new HttpEntity<>(requestData);
    ResponseEntity<MydataDTO> response = restTemplate.postForEntity(externalServerUrl, request, MydataDTO.class);
    return ResponseEntity.ok(response.getBody());
  }
}
