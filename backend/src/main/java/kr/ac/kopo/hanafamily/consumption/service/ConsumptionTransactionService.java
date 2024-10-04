package kr.ac.kopo.hanafamily.consumption.service;

import java.util.List;
import kr.ac.kopo.hanafamily.mydata.dto.BankStatementDTO;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;

public interface ConsumptionTransactionService {

  List<BankStatementDTO> getIncomeByFamilyId(Integer familyId);
  List<TransactionDTO> getFamilyTransactions(Integer familyId);
  List<InsuranceDTO> getFamilyInsurance(Integer familyId);
  List<LoanDTO> getFamilyLoan(Integer familyId);

}
