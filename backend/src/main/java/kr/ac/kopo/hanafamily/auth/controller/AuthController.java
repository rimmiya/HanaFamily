//package kr.ac.kopo.hanafamily.auth.controller;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import java.util.HashMap;
//import java.util.Map;
//import kr.ac.kopo.hanafamily.auth.service.AuthService;
//import kr.ac.kopo.hanafamily.user.domain.UserDTO;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@Controller
//public class AuthController {
//
//  @Autowired
//  private AuthService authService;
//
//  @Value("${tokenresult.uri}")
//  private String tokenResultUri;
//
//  @GetMapping("/show-send-form") // 본인 인증하기 버튼 클릭시
//  public String showSend(HttpServletRequest request, Model model) {
//    String customerId = getUserId(request, model);
//    String authorizeUrl = authService.getShowSendUrl(customerId);
//    return "redirect:" + authorizeUrl;
//  }
//
//  public String getUserId(HttpServletRequest request, Model model) {
//    HttpSession session = request.getSession(false); // 기존 세션 가져오기, 없으면 null 반환
//    if (session != null) {
//      UserDTO customer = (UserDTO) session.getAttribute("customer");
//      if (customer != null) {
//        model.addAttribute("user_no", customer.getUserNo());
//        return customer.getCustomerId();
//      } else {
//        return null; // 세션에 사용자 정보가 없으면 로그인 페이지로 리다이렉트
//      }
//    } else {
//      return null; // 세션 자체가 없으면 로그인 페이지로 리다이렉트
//    }
//  }
//
//  @GetMapping("/authorize")
//  public String authorize() {
//    String authorizeUrl = authService.getAuthorizeUrl();
//    return "redirect:" + authorizeUrl;
//  }
//
//  @GetMapping("/callback")
//  public ResponseEntity<?> callback(@RequestParam(value = "customer_id") String customerId,
//      @RequestParam String code, @RequestParam String state) {
//    AccessTokenResponseDTO accessTokenResponse = authService.getAccessToken(code);
//    if (accessTokenResponse != null) {
//      Map<String, String> response = new HashMap<>();
//      // 배포시 실제 IP 주소로 변경하기
////            response.put("redirectUrl",
////                "http://43.203.242.167:8080/tokenResult?access_token=" + accessTokenResponse.getAccess_token()
////                    + "&state=" + state + "&customer_id=" + customerId);
//      response.put("redirectUrl",
//          tokenResultUri + "/tokenResult?access_token=" + accessTokenResponse.getAccess_token()
//              + "&state=" + state + "&customer_id=" + customerId);
//
//      return ResponseEntity.ok(response);
//    } else {
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//          .body("Error obtaining access token");
//    }
//  }
//
//  @GetMapping("/tokenResult")
//  public String result(@RequestParam("customer_id") String customerId,
//      @RequestParam(required = false) String access_token,
//      @RequestParam(required = false) String state, Model model) {
//    if (access_token != null) {
//      authService.updateAccessToken(customerId, access_token);
//      model.addAttribute("customerId", customerId);
//      model.addAttribute("accessToken", access_token);
//      return "authcomplete";
//    }
//    return "redirect:/login";
//  }
//
//  //    @GetMapping("/request-auth-code")
////    public ResponseEntity<?> requestAuthCode(HttpServletRequest request, Model model) {
////        String customerId = getUserId(request, model);
////        if (customerId == null) {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
////        }
////        try {
////            String accessToken = authService.getAccessTokenByCustomerId(customerId);
////            RequestAuthCodeResponseDTO authCodeResponse = authService.requestAuthCode(accessToken, customerId);
////            authService.saveAuthCode(authCodeResponse);  // Save the auth code using DTO
////            return ResponseEntity.ok(authCodeResponse);
////        } catch (DataIntegrityViolationException e) {
////            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate auth code or access token");
////        } catch (Exception e) {
////            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error in F4: " + e.getMessage());
////        }
////    }
//  @GetMapping("/request-auth-code")
//  public String requestAuthCode(HttpServletRequest request, HttpServletResponse response, Model model, HttpSession session) {
//    String customerId = getUserId(request, model);
//    System.out.println("in the request-auth");
//    if (customerId == null) {
//      return "redirect:/login"; // 로그인 페이지로 리다이렉트
//    }
//    try {
//      String accessToken = authService.getAccessTokenByCustomerId(customerId);
//      RequestAuthCodeResponseDTO authCodeResponse = authService.requestAuthCode(accessToken, customerId);
//      authService.saveAuthCode(authCodeResponse);
//
//      System.out.println("request-auth ready to return");
//      return "redirect:/accountinfo"; // /accountinfo로 리다이렉트
//    } catch (DataIntegrityViolationException e) {
//      model.addAttribute("error", "Duplicate auth code or access token");
//      return "error"; // 에러 페이지 반환
//    } catch (Exception e) {
//      model.addAttribute("error", "Server error: " + e.getMessage());
//      return "error"; // 에러 페이지 반환
//    }
//  }
//
//  @GetMapping("/auth-code-page")
//  public String authCodePage() {
//    return "auth-code-page"; // templates 폴더 내의 auth-code-page.html을 렌더링
//  }
//}