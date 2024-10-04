package kr.ac.kopo.hanafamily.savings.mapper;

import java.util.List;
import kr.ac.kopo.hanafamily.savings.dto.SavingProductDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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

  void insertSavingProductIntoTransaction(@Param("amount") Integer amount, @Param("savingProduct") SavingProductDTO savingProduct);


}
