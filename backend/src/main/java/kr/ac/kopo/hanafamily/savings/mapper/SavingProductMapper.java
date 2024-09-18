package kr.ac.kopo.hanafamily.savings.mapper;

import kr.ac.kopo.hanafamily.savings.dto.SavingProductDTO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SavingProductMapper {
  SavingProductDTO selectSavingProductByAccountNo(String savingAccountNo);
  List<SavingProductDTO> selectSavingProductsByUserNo(Integer userNo);
  void insertSavingProduct(SavingProductDTO savingProduct);
  void updateSavingProduct(SavingProductDTO savingProduct);
  void deleteSavingProduct(String savingAccountNo);

  // selectAllSavingProducts
  List<SavingProductDTO> selectAllSavingProducts();

  List<SavingProductDTO> getFamilySavingsList(Integer familyId);
}
