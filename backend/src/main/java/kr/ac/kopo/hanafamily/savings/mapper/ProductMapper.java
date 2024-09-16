package kr.ac.kopo.hanafamily.savings.mapper;

import kr.ac.kopo.hanafamily.savings.dto.ProductDTO;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper {
  ProductDTO selectProductById(Integer productId);
  List<ProductDTO> selectAllProducts();
  void insertProduct(ProductDTO product);
  void updateProduct(ProductDTO product);
  void deleteProduct(Integer productId);
}
