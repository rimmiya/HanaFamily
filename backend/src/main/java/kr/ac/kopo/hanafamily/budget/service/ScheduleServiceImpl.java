package kr.ac.kopo.hanafamily.budget.service;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.ScheduleDTO;
import kr.ac.kopo.hanafamily.budget.mapper.ScheduleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

  @Autowired
  private ScheduleMapper scheduleMapper;

  @Override
  public void addSchedule(ScheduleDTO scheduleDTO) {
    scheduleMapper.insertSchedule(scheduleDTO);
  }
  @Override
  public void updateSchedule(Integer scheduleId, ScheduleDTO scheduleDTO) {
    scheduleDTO.setScheduleId(scheduleId);
    scheduleMapper.updateSchedule(scheduleDTO);
  }
  @Override
  public void deleteSchedule(Integer scheduleId) {
    scheduleMapper.deleteSchedule(scheduleId);
  }
  @Override
  public List<ScheduleDTO> getSchedulesByFamilyId(Integer familyId) {
    return scheduleMapper.getSchedulesByFamilyId(familyId);
  }
}