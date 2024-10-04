package kr.ac.kopo.hanafamily.budget.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.ScheduleDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScheduleMapper {
  void insertSchedule(ScheduleDTO scheduleDTO);
  void updateSchedule(ScheduleDTO scheduleDTO);
  void deleteSchedule(Integer scheduleId);
  List<ScheduleDTO> getSchedulesByFamilyId(Integer familyId);
}