package kr.ac.kopo.hanafamily.savings.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.SavingsParticipationDTO;
import kr.ac.kopo.hanafamily.savings.dto.SavingsParticipationWithNameDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SavingsParticipationMapper {
  List<SavingsParticipationDTO> selectParticipationBySavingAccountNo(String savingAccountNo);
  List<SavingsParticipationDTO> selectParticipationByUserId(Integer userNo);
  void insertSavingsParticipation(SavingsParticipationDTO participation);
  void updateSavingsParticipation(SavingsParticipationDTO participation);
  void updateParticipationInfo(SavingsParticipationDTO participation);
  void deleteSavingsParticipation(String savingAccountNo, Integer userNo);
  SavingsParticipationDTO selectParticipationBySavingAccountNoAndUserNo(@Param("savingAccountNo") String savingAccountNo, @Param("userNo") Integer userNo);
  List<SavingsParticipationDTO> selectAllParticipations();
  List<SavingsParticipationWithNameDTO> selectParticipationWithNameBySavingAccountNo (@Param("savingAccountNo") String savingAccountNo);
}

