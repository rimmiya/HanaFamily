package kr.ac.kopo.hanafamily.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvitationRequestDTO {
  public Integer userNo;
  public String inviteePhone;
}
