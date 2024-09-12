package kr.ac.kopo.hanafamily.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FamilyDTO {
  private Integer familyId;
  private Integer inviterNo;
  private Integer inviteeNo;
  private String relationship;
  private String invitationCode;
}