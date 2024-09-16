package kr.ac.kopo.hanafamily.savings.service;

public interface AccountService {
  void transferFromUserAccountToSavings(String userAccountNo, String savingAccountNo, Integer amount);
}
