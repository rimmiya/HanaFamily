package kr.ac.kopo.hanafamily.consumption.service;

import java.util.List;
import kr.ac.kopo.hanafamily.consumption.mapper.TransactionMapper;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

  @Autowired
  private TransactionMapper transactionMapper;

  // 특정 사용자의 소비 내역을 가져오는 메소드
  @Override
  public List<TransactionDTO> getFamilyTransactions(Integer familyId) {
    return transactionMapper.getTransactionsByFamilyId(familyId);
  }
}