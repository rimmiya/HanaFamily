package kr.ac.kopo.hanafamily.budget.service;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.ScheduleDTO;

public interface ScheduleService {
  void addSchedule(ScheduleDTO scheduleDTO);
  void updateSchedule(Integer scheduleId, ScheduleDTO scheduleDTO);
  void deleteSchedule(Integer scheduleId);
  List<ScheduleDTO> getSchedulesByFamilyId(Integer familyId);

}
