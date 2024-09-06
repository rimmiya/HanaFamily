package kr.ac.kopo.hanafamily.security.config;

import kr.ac.kopo.hanafamily.security.jwt.service.CustomUserDetailsService;
import kr.ac.kopo.hanafamily.security.jwt.JwtFilter;
import kr.ac.kopo.hanafamily.security.jwt.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
  private final CustomUserDetailsService customUserDetailsService;
  private final JwtUtil jwtUtil;

//  인증 필요한 경로 설정
  private static final String[] AUTH_WHITELIST = {
    "/api/**",
  };

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 X
    http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
        SessionCreationPolicy.STATELESS));

    http.csrf(AbstractHttpConfigurer::disable); // csrf 보안 설정
    http.formLogin(AbstractHttpConfigurer::disable); // form 로그인 설정
    http.httpBasic(AbstractHttpConfigurer::disable); // httpBasic 설정

    // JWT 필터 추가
    http.addFilterBefore(new JwtFilter(jwtUtil, customUserDetailsService),
        UsernamePasswordAuthenticationFilter.class);

    // 권한 규칙 작성
    http.authorizeHttpRequests(authorize -> authorize
        .requestMatchers(AUTH_WHITELIST).permitAll()
        //@PreAuthrization을 사용할 것이기 때문에 모든 경로에 대한 인증처리는 Pass
        .anyRequest().permitAll()
    );
    return http.build();
  }
}
