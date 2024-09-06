package kr.ac.kopo.hanafamily.security.jwt;

import java.util.Collection;
import java.util.List;
import kr.ac.kopo.hanafamily.user.domain.UserDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
  private final UserDTO userDTO;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }
  @Override
  public String getUsername() {
    return userDTO.getUserName();
  }

  @Override
  public String getPassword() {
    return userDTO.getUserPw();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
