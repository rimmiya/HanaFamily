package kr.ac.kopo.hanafamily.invitation.mapper;

import kr.ac.kopo.hanafamily.invitation.dto.InvitationDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InvitationMapper {

  // 초대장을 DB에 저장하는 메서드
  void insertInvitation(@Param("invitation") InvitationDTO invitation);

  int getLastInsertId(@Param("inviteKey") String inviteKey);

  String getUserIdByInviteKey(@Param("inviteKey") String inviteKey);

  // 초대장 식별키로 초대장 조회하는 메서드
  InvitationDTO findByInviteKey(@Param("inviteKey") String inviteKey);

  // 초대장 사용 여부를 업데이트하는 메서드
  void markAsUsed(@Param("id") Integer id);
}
