package kr.ac.kopo.hanafamily.user.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.invitation.dto.FamilyDTO;
import kr.ac.kopo.hanafamily.user.domain.FamilyMemberDTO;
import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import kr.ac.kopo.hanafamily.user.domain.UserNameDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
//import org.springframework.data.repository.query.Param;


@Mapper
public interface UserMapper {
//  boolean isUserExist(@Param("name") String name, @Param("birth") String birth, @Param("phoneNumber") String phoneNumber);
//
//  boolean isIdExist(@Param("id") String id);
//
//  void register(RegisterRequest request);
//
//  boolean isAccountExist(@Param("id") String id);
//
//  boolean isCorrectPassword(LoginRequest request);

  UserDTO selectUserByNo(@Param("userNo") Integer userNo);

  UserDTO getFamilyIdByUserNo(@Param("userNo") Integer userNo);

  UserDTO getUser(@Param("userId") String userId, @Param("userPw") String userPw);

  UserDTO getUserById(@Param("userId") String userId);

  String getPhoneNumberById(@Param("userId") String userId);

  String getPhoneNumberByNo(@Param("userNo") Integer userNo);

  Integer getUserFamilyId(@Param("userId") String userId);

  void updateUserFamilyId(@Param("familyId") Integer familyId, @Param("userId") String userId);

  void insertFamily(FamilyDTO family);

  FamilyMemberDTO getFamilyMembers(@Param("familyId") Integer familyId);
  List<UserNameDTO> getUsersByUserNos(List<Integer> userNos);
}