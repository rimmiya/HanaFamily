package kr.ac.kopo.hanafamily;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"kr.ac.kopo.hanafamily.user.mapper", "kr.ac.kopo.hanafamily.invitation.mapper", "kr.ac.kopo.hanafamily.mydata.mapper"})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}