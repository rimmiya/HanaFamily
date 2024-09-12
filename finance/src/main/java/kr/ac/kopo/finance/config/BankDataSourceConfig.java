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
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
@MapperScan(basePackages = "kr.ac.kopo.finance.mapper.bank", sqlSessionFactoryRef = "bankdbSqlSessionFactory")
public class BankDataSourceConfig {

  @Primary
  @Bean(name = "bankdbDataSource")
  @ConfigurationProperties(prefix = "spring.datasource.bankdb")
  public DataSource bankdbDataSource() {
    return DataSourceBuilder.create().build();
  }

  @Primary
  @Bean(name = "bankdbSqlSessionFactory")
  public SqlSessionFactory bankdbSqlSessionFactory(@Qualifier("bankdbDataSource") DataSource bankdbDataSource) throws Exception {
    SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
    sessionFactory.setDataSource(bankdbDataSource);
    sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mappers/bankdb/*.xml"));
    return sessionFactory.getObject();
  }

  @Primary
  @Bean(name = "bankdbSqlSessionTemplate")
  public SqlSessionTemplate bankdbSqlSessionTemplate(@Qualifier("bankdbSqlSessionFactory") SqlSessionFactory bankdbSqlSessionFactory) {
    return new SqlSessionTemplate(bankdbSqlSessionFactory);
  }

  @Primary
  @Bean(name = "bankdbTransactionManager")
  public DataSourceTransactionManager bankdbTransactionManager(@Qualifier("bankdbDataSource") DataSource bankdbDataSource) {
    return new DataSourceTransactionManager(bankdbDataSource);
  }
}
