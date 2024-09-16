package kr.ac.kopo.hanafamily.savings.mapper;

import kr.ac.kopo.hanafamily.savings.dto.SavingsTransactionDTO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SavingsTransactionMapper {
  List<SavingsTransactionDTO> selectTransactionsBySavingAccountNo(String savingAccountNo);
  void insertSavingsTransaction(SavingsTransactionDTO transaction);
}
