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
@MapperScan(basePackages = "kr.ac.kopo.finance.mapper.card", sqlSessionFactoryRef = "carddbSqlSessionFactory")
public class CardDataSourceConfig {

  @Bean(name = "carddbDataSource")
  @ConfigurationProperties(prefix = "spring.datasource.carddb")
  public DataSource carddbDataSource() {
    return DataSourceBuilder.create().build();
  }

  @Bean(name = "carddbSqlSessionFactory")
  public SqlSessionFactory carddbSqlSessionFactory(@Qualifier("carddbDataSource") DataSource carddbDataSource) throws Exception {
    SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
    sessionFactory.setDataSource(carddbDataSource);
    sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mappers/carddb/*.xml"));
    return sessionFactory.getObject();
  }

  @Bean(name = "carddbSqlSessionTemplate")
  public SqlSessionTemplate carddbSqlSessionTemplate(@Qualifier("carddbSqlSessionFactory") SqlSessionFactory carddbSqlSessionFactory) {
    return new SqlSessionTemplate(carddbSqlSessionFactory);
  }

  @Bean(name = "carddbTransactionManager")
  public DataSourceTransactionManager carddbTransactionManager(@Qualifier("carddbDataSource") DataSource carddbDataSource) {
    return new DataSourceTransactionManager(carddbDataSource);
  }
}
