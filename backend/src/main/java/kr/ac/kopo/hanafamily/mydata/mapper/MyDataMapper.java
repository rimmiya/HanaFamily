package kr.ac.kopo.hanafamily.mydata.mapper;


import kr.ac.kopo.hanafamily.mydata.dto.AccountDTO;
import kr.ac.kopo.hanafamily.mydata.dto.BankStatementDTO;
import kr.ac.kopo.hanafamily.mydata.dto.CardDTO;
import kr.ac.kopo.hanafamily.mydata.dto.InsuranceDTO;
import kr.ac.kopo.hanafamily.mydata.dto.LoanDTO;
import kr.ac.kopo.hanafamily.mydata.dto.MyDataStatusDTO;
import kr.ac.kopo.hanafamily.mydata.dto.SecurityDTO;
import kr.ac.kopo.hanafamily.mydata.dto.StockDTO;
import kr.ac.kopo.hanafamily.mydata.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MyDataMapper {
  void insertMyDataAccounts(@Param("userNo") Integer userNo, @Param("account") AccountDTO account);

  void insertMyDataCards(@Param("userNo") Integer userNo, @Param("card") CardDTO card);

  void insertMyDataLoans(@Param("userNo") Integer userNo, @Param("loan") LoanDTO loan);

  void insertMyDataInsurances(@Param("userNo") Integer userNo, @Param("insurance") InsuranceDTO insurance);

  void insertMyDataSecurities(@Param("userNo") Integer userNo, @Param("security") SecurityDTO security);

  void insertBankStatement(@Param("userNo") Integer userNo, @Param("bankStatement") BankStatementDTO bankStatement);

  void insertCardStatement(@Param("userNo") Integer userNo, @Param("cardStatement") TransactionDTO cardStatement);

  void insertStockStatement(@Param("userNo") Integer userNo, @Param("stockStatement") StockDTO stockStatement);

  void updateMyDataConnectionStatus(@Param("userNo") Integer userNo);

  MyDataStatusDTO selectMyDataConnection(@Param("userNo") Integer userNo);
}
