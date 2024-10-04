package kr.ac.kopo.hanafamily.consumption.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ConsumptionTransactionMapper {
  // 특정 사용자의 소비 내역 조회
  List<TransactionDTO> getTransactionsByFamilyId(@Param("familyId") Integer familyId);
  List<LoanDTO> getLoanByFamilyId(@Param("familyId") Integer familyId);
  List<InsuranceDTO> getInsuranceByFamilyId(@Param("familyId") Integer familyId);
}