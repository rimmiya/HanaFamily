package kr.ac.kopo.finance.config;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
@MapperScan(basePackages = "kr.ac.kopo.finance.mapper.security", sqlSessionFactoryRef = "securitydbSqlSessionFactory")
public class SecurityDataSourceConfig {

  public class securityDataSourceConfig {

    @Bean(name = "securitydbDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.securitydb")
    public DataSource securitydbDataSource() {
      return DataSourceBuilder.create().build();
    }

    @Bean(name = "securitydbSqlSessionFactory")
    public SqlSessionFactory securitydbSqlSessionFactory(@Qualifier("securitydbDataSource") DataSource securitydbDataSource) throws Exception {
      SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
      sessionFactory.setDataSource(securitydbDataSource);
      sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mappers/securitydb/*.xml"));
      return sessionFactory.getObject();
    }

    @Bean(name = "securitydbSqlSessionTemplate")
    public SqlSessionTemplate securitydbSqlSessionTemplate(@Qualifier("securitydbSqlSessionFactory") SqlSessionFactory securitydbSqlSessionFactory) {
      return new SqlSessionTemplate(securitydbSqlSessionFactory);
    }

    @Bean(name = "securitydbTransactionManager")
    public DataSourceTransactionManager securitydbTransactionManager(@Qualifier("securitydbDataSource") DataSource securitydbDataSource) {
      return new DataSourceTransactionManager(securitydbDataSource);
    }
  }

}
