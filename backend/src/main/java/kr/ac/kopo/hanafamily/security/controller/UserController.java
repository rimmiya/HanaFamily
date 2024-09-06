package kr.ac.kopo.hanafamily.security.controller;

import kr.ac.kopo.hanafamily.security.jwt.CustomUserDetails;
import kr.ac.kopo.hanafamily.security.jwt.service.CustomUserDetailsService;
import kr.ac.kopo.hanafamily.user.domain.LoginRequest;
import kr.ac.kopo.hanafamily.user.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private CustomUserDetailsService customUserDetailsService;

  @Autowired
  private UserService userService;
  @PostMapping("/login")
  public ResponseEntity<?> getUserDetails(@RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok(userService.signIn(loginRequest));
//    return customUserDetailsService.loadUserByUsername(loginRequest.getId());
  }


}
