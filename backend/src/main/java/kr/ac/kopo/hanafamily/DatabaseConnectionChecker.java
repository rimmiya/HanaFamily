package kr.ac.kopo.hanafamily;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnectionChecker implements CommandLineRunner {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Override
  public void run(String... args) throws Exception {
    try {
      jdbcTemplate.execute("SELECT 1 FROM DUAL");
      System.out.println("Database connection is successful!");
    } catch (Exception e) {
      System.out.println("Database connection failed: " + e.getMessage());
    }
  }
}