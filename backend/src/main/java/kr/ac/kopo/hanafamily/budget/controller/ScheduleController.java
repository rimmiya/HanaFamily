package kr.ac.kopo.hanafamily.budget.controller;

import java.util.List;
import kr.ac.kopo.hanafamily.budget.dto.ScheduleDTO;
import kr.ac.kopo.hanafamily.budget.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

  @Autowired
  private ScheduleService scheduleService;

  // 일정 추가 API
  @PostMapping("/add")
  public void addSchedule(@RequestBody ScheduleDTO scheduleDTO) {
    scheduleService.addSchedule(scheduleDTO);
  }

  // 일정 수정 API
  @PutMapping("/update/{scheduleId}")
  public void updateSchedule(@PathVariable("scheduleId") Integer scheduleId, @RequestBody ScheduleDTO scheduleDTO) {
    scheduleService.updateSchedule(scheduleId, scheduleDTO);
  }

  // 일정 삭제 API
  @DeleteMapping("/delete/{scheduleId}")
  public void deleteSchedule(@PathVariable("scheduleId") Integer scheduleId) {
    scheduleService.deleteSchedule(scheduleId);
  }

  // 가족 일정 조회 API
  @GetMapping("/family/{familyId}")
  public List<ScheduleDTO> getSchedulesByFamilyId(@PathVariable("familyId") Integer familyId) {
    List<ScheduleDTO> schedules = scheduleService.getSchedulesByFamilyId(familyId);
    return schedules;
  }
}
