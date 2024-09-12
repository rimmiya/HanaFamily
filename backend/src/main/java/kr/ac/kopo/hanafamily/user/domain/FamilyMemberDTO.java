package kr.ac.kopo.hanafamily.user.domain;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FamilyMemberDTO {
  private Integer familyId;
  private List<UserDTO> familyMembers;
}
