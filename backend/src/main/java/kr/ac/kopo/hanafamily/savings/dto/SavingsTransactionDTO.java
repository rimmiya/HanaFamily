package kr.ac.kopo.hanafamily.savings.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingsTransactionDTO {
    private Integer transactionId; // TRANSACTION_ID
    private String savingAccountNo; // SAVING_ACCOUNT_NO
    private Integer userNo; // USER_NO
    private Integer amount; // AMOUNT
    private Integer afterAmount; // AFTER_AMOUNT
    private Date transactionDate; // TRANSACTION_DATE
    private String transactionType; // TRANSACTION_TYPE
}
