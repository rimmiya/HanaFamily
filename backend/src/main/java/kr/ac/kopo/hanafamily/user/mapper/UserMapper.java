package kr.ac.kopo.hanafamily.user.mapper;

import kr.ac.kopo.hanafamily.user.domain.LoginRequest;
import kr.ac.kopo.hanafamily.user.domain.RegisterRequest;
import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;


@Mapper
public interface UserMapper {
  boolean isUserExist(@Param("name") String name, @Param("birth") String birth, @Param("phoneNumber") String phoneNumber);

  boolean isIdExist(@Param("id") String id);

  void register(RegisterRequest request);

  boolean isAccountExist(@Param("id") String id);

  boolean isCorrectPassword(LoginRequest request);

  UserDTO getUser(@Param("userId") String userId, @Param("userPw") String userPw);

  UserDTO getUserById(@Param("userId") String userId);
//
//  UserDTO getUserByNamePhoneNumber(@Param("name") String name ,@Param("phoneNumber") String phoneNumber);
}