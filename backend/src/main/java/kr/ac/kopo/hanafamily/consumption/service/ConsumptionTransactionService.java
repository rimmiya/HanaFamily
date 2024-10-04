package kr.ac.kopo.hanafamily.consumption.service;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;

public interface TransactionService {
  List<TransactionDTO> getFamilyTransactions(Integer familyId);
}
