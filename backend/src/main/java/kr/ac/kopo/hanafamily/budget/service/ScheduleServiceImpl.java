package kr.ac.kopo.hanafamily.budget.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

  @Autowired
  private ScheduleMapper scheduleMapper;

  public void addSchedule(ScheduleDTO scheduleDTO) {
    scheduleMapper.insertSchedule(scheduleDTO);
  }

  public void updateSchedule(Integer scheduleId, ScheduleDTO scheduleDTO) {
    scheduleDTO.setScheduleId(scheduleId);
    scheduleMapper.updateSchedule(scheduleDTO);
  }

  public void deleteSchedule(Integer scheduleId) {
    scheduleMapper.deleteSchedule(scheduleId);
  }

  public List<ScheduleDTO> getSchedulesByFamilyId(Integer familyId) {
    return scheduleMapper.getSchedulesByFamilyId(familyId);
  }
}