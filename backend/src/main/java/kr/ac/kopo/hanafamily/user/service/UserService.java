package kr.ac.kopo.hanafamily.user.service;

import java.util.List;
import kr.ac.kopo.hanafamily.security.jwt.Claim;
import kr.ac.kopo.hanafamily.security.jwt.JwtUtil;
import kr.ac.kopo.hanafamily.user.domain.LoginRequest;
import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import kr.ac.kopo.hanafamily.user.domain.UserNameDTO;
import kr.ac.kopo.hanafamily.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  @Autowired
  private UserMapper userMapper;
  private final JwtUtil jwtUtil;
  public String signIn(LoginRequest request) {
    UserDTO user = userMapper.getUser(request.getUserId(), request.getUserPw());
    System.out.println(user.toString());
    Claim claim = new Claim();
    claim.setUserDTO(user);
    return jwtUtil.createAccessToken(claim);
  }

  // 사용자 번호 리스트를 받아 해당하는 사용자들의 이름을 반환
  public List<UserNameDTO> getUserNamesByUserNos(List<Integer> userNos) {
    List<UserNameDTO> users = userMapper.getUsersByUserNos(userNos);
    return users;
  }
}
