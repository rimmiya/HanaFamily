package kr.ac.kopo.hanafamily.budget.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {
  private Integer scheduleId;
  private String title;
  private String description; // 선택 사항
  private Integer userNo;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date startDate;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date endDate;  // 선택 사항
  private String startTime; // 선택 사항
  private String endTime; // 선택 사항
  private String location; // 선택 사항
  private String scheduleStatus; // 선택 사항
  private String repeatType; // 선택 사항
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date createdAt;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date updatedAt;
  private Integer familyId;
  private Integer budget;
  private Integer categoryId;
}
