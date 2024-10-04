package kr.ac.kopo.finance.mapper.card;

import java.util.List;
import kr.ac.kopo.finance.dto.CardDTO;
import kr.ac.kopo.finance.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CardMapper {
  List<CardDTO> getCardData(@Param("userNo") Integer userNo, @Param("cardCode") Integer cardCode);

  List<TransactionDTO> getTransactionData(@Param("userNo") Integer userNo, @Param("cardNo") String cardNo);
}
