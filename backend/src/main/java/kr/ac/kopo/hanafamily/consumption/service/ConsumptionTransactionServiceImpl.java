package kr.ac.kopo.hanafamily.consumption.service;

import java.util.List;
import kr.ac.kopo.hanafamily.consumption.mapper.ConsumptionTransactionMapper;
import kr.ac.kopo.hanafamily.mydata.dto.BankStatementDTO;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import kr.ac.kopo.hanafamily.savings.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsumptionTransactionServiceImpl implements ConsumptionTransactionService {

  @Autowired
  private ConsumptionTransactionMapper consumptionTransactionMapper;

  @Autowired
  private AccountMapper accountMapper;

  // 계좌번호를 기준으로 수입(입금) 내역을 가져오는 메소드
  @Override
  public List<BankStatementDTO> getIncomeByFamilyId(Integer familyId) {
    return accountMapper.getIncomeByFamilyId(familyId);
  }

  // 특정 사용자의 소비 내역을 가져오는 메소드
  @Override
  public List<TransactionDTO> getFamilyTransactions(Integer familyId) {
    return consumptionTransactionMapper.getTransactionsByFamilyId(familyId);
  }

  @Override
  public List<LoanDTO> getFamilyLoan(Integer familyId) {
    return consumptionTransactionMapper.getLoanByFamilyId(familyId);
  }

  @Override
  public List<InsuranceDTO> getFamilyInsurance(Integer familyId) {
    return consumptionTransactionMapper.getInsuranceByFamilyId(familyId);
  }

}