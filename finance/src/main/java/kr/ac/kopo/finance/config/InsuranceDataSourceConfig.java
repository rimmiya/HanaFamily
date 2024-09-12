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
@MapperScan(basePackages = "kr.ac.kopo.finance.mapper.insurance", sqlSessionFactoryRef = "insurancedbSqlSessionFactory")
public class InsuranceDataSourceConfig {

    @Bean(name = "insurancedbDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.insurancedb")
    public DataSource insurancedbDataSource() {
      return DataSourceBuilder.create().build();
    }

    @Bean(name = "insurancedbSqlSessionFactory")
    public SqlSessionFactory insurancedbSqlSessionFactory(@Qualifier("insurancedbDataSource") DataSource insurancedbDataSource) throws Exception {
      SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
      sessionFactory.setDataSource(insurancedbDataSource);
      sessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mappers/insurancedb/*.xml"));
      return sessionFactory.getObject();
    }

    @Bean(name = "insurancedbSqlSessionTemplate")
    public SqlSessionTemplate insurancedbSqlSessionTemplate(@Qualifier("insurancedbSqlSessionFactory") SqlSessionFactory insurancedbSqlSessionFactory) {
      return new SqlSessionTemplate(insurancedbSqlSessionFactory);
    }

    @Bean(name = "insurancedbTransactionManager")
    public DataSourceTransactionManager insurancedbTransactionManager(@Qualifier("insurancedbDataSource") DataSource insurancedbDataSource) {
      return new DataSourceTransactionManager(insurancedbDataSource);
    }
}
