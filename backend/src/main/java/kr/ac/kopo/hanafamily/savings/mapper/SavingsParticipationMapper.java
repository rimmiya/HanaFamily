package kr.ac.kopo.hanafamily.savings.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.SavingsParticipationDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SavingsParticipationMapper {
  List<SavingsParticipationDTO> selectParticipationBySavingAccountNo(String savingAccountNo);
  List<SavingsParticipationDTO> selectParticipationByUserId(Integer userNo);
  void insertSavingsParticipation(SavingsParticipationDTO participation);
  void updateSavingsParticipation(SavingsParticipationDTO participation);
  void deleteSavingsParticipation(String savingAccountNo, Integer userNo);
  List<SavingsParticipationDTO> selectAllParticipations();
}

