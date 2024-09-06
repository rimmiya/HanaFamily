package kr.ac.kopo.hanafamily.security.jwt.service;

import java.util.Date;
import kr.ac.kopo.hanafamily.security.jwt.CustomUserDetails;
import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import kr.ac.kopo.hanafamily.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {
  private final UserMapper userMapper;

  @Override
  public CustomUserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
    UserDTO userDTO = userMapper.getUserById(userId);

    if (userDTO == null) {
      throw new UsernameNotFoundException("해당하는 유저가 없습니다.");
    }
    return new CustomUserDetails(userDTO);
  }
}