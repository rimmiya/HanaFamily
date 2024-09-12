package kr.ac.kopo.hanafamily.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil {

  private final Key key;
  private final Long accessTokenExpiration;

  public JwtUtil(@Value ("${jwt.secret}") String secret, @Value("${jwt.expire}") Long expiration) {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    this.key = Keys.hmacShaKeyFor(keyBytes);
    this.accessTokenExpiration = expiration;
  }

  /**
   * Access Token 생성
   * @param userDTO 사용자 정보 객체
   * @return Access Token String
   */
  public String createAccessToken(Claim userDTO) {
    return createToken(userDTO, accessTokenExpiration);
  }

  private String createToken(Claim userDTO, long expireTime) {
    ZonedDateTime now = ZonedDateTime.now();
    ZonedDateTime tokenValidity = now.plusSeconds(expireTime);


    return Jwts.builder()
        .claim("userNo", userDTO.getUserDTO().getUserNo())
        .claim("userId", userDTO.getUserDTO().getUserId())
        .claim("userName", userDTO.getUserDTO().getUserName())
        .claim("familyId", userDTO.getUserDTO().getFamilyId())
        .setIssuedAt(Date.from(now.toInstant()))
        .setExpiration(Date.from(tokenValidity.toInstant()))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  /**
   * Token에서 사용자 이D 추출
   *
   * @param token JWT Token
   * @return 사용자 이름
   */
  public String getUserName(String token) {
    return parseClaims(token).get("name", String.class);
  }

//  public String getUserId(String token) {
//    return parseClaims(token).get("userId", String.class);
//  }

  public String resolveToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    } else {
      return null;
    }
  }

   /**
   *JWT 검증
   * @param token
   * @return IsValidate
   **/
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (SecurityException | MalformedJwtException e) {
      log.info("Invalid JWT Token", e);
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT Token", e);
    } catch (UnsupportedJwtException e) {
      log.info("Unsupported JWT Token", e);
    } catch (IllegalArgumentException e) {
      log.info("JWT claims string is empty.", e);
    }
    return false;
  }

  /**
   * JWT Claims 추출
   * @param accessToken
   * @return JWT Claims
   */
  public Claims parseClaims(String accessToken) {
    try {
      return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }
}
