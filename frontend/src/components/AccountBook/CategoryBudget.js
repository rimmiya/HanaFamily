import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Progress,
  Button,
  Modal,
  InputNumber,
  message,
  Select,
  Space,
} from "antd";
import {
  DollarCircleOutlined,
  CodeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

function CategoryBudget() {
  const [data, setData] = useState([]); // 백엔드에서 가져온 예산 데이터를 저장
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택한 카테고리를 저장하는 상태
  const [transactions, setTransactions] = useState([]); // 선택된 카테고리의 거래 내역을 저장
  const [classifiedTransactions, setClassifiedTransactions] = useState([]); // 자동 분류된 거래 내역을 저장
  const [budget, setBudget] = useState(0); // 선택된 카테고리의 예산을 저장
  const [isModalVisible, setIsModalVisible] = useState(false); // 예산 수정 모달 상태
  const [transactionModalVisible, setTransactionModalVisible] = useState(false); // 거래 내역 모달 상태
  const [currentCategory, setCurrentCategory] = useState(null); // 선택된 카테고리를 저장
  const [newBudget, setNewBudget] = useState(0); // 수정 중인 새로운 예산 값을 저장
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 선택한 월 (기본값: 현재 월)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false); // 카테고리 분류 모달 상태
  const [loadingCategory, setLoadingCategory] = useState(false); // 카테고리 분류 로딩 상태
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false); // 카테고리 추가 모달 상태
  const [newCategoryBudget, setNewCategoryBudget] = useState(0); // 새로운 카테고리 예산
  const [newCategory, setNewCategory] = useState(null); // 새로운 카테고리 선택

  const user = useSelector((state) => state.user.userInfo);

  const defaultCategories = [
    { categoryId: 1, categoryName: "식사" },
    { categoryId: 2, categoryName: "카페/간식" },
    { categoryId: 3, categoryName: "의료/건강" },
    { categoryId: 4, categoryName: "술/유흥" },
    { categoryId: 5, categoryName: "의복/미용" },
    { categoryId: 6, categoryName: "자동차" },
    { categoryId: 7, categoryName: "교통" },
    { categoryId: 8, categoryName: "주거/통신" },
    { categoryId: 9, categoryName: "생활" },
    { categoryId: 10, categoryName: "문화/여가" },
    { categoryId: 11, categoryName: "여행/숙박" },
    { categoryId: 12, categoryName: "교육" },
    { categoryId: 13, categoryName: "육아" },
    { categoryId: 14, categoryName: "기타" },
    { categoryId: 15, categoryName: "경조사" },
  ];

  // 카테고리 추가 모달 표시 함수
  const showAddCategoryModal = () => {
    setAddCategoryModalVisible(true);
  };

  // 카테고리 추가 확인 함수
  const handleAddCategory = async () => {
    try {
      await axios.post("http://localhost:8080/api/budget/category/insert", {
        familyId: user.familyId,
        categoryId: newCategory,
        budgetAmount: Number(newCategoryBudget),
        actualAmount: 0,
        budgetStatus: "ACTIVE",
      });

      message.success("카테고리가 성공적으로 추가되었습니다.");
      fetchBudgetByfamilyId(selectedMonth); // 예산 데이터를 다시 가져옴
      setAddCategoryModalVisible(false); // 모달 닫기
    } catch (error) {
      console.error("카테고리 추가 중 오류 발생", error);
      message.error("카테고리 추가에 실패했습니다.");
    }
  };

  // 컴포넌트가 마운트될 때 백엔드에서 예산 데이터를 가져옴
  useEffect(() => {
    // fetchBudgetByfamilyId를 해서 예산 데이터를 가져오는데 없으면 fetchDefaultBudget를 해서 평균 예산 데이터를 가져옴
    fetchBudgetByfamilyId(selectedMonth);
  }, []);

  // 패밀리의 모든 예산 데이터를 백엔드에서 가져오는 함수
  const fetchBudgetByfamilyId = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/${user.familyId}/category/month/${month}`
      );

      if (response.data && response.data.length > 0) {
        setBudget(response.data);
      } else {
        // 만약 가져온 데이터가 없으면, 기본 평균 예산 데이터를 가져옴
        console.log("예산 데이터가 없어 기본 예산 데이터를 가져옵니다.");
        fetchDefaultBudget(month);
      }
    } catch (error) {
      console.error("예산 데이터를 가져오는 중 오류 발생", error);
      fetchDefaultBudget(month); // 오류 발생 시에도 기본 예산 데이터를 가져옴
    }
  };

  const fetchDefaultBudget = async (month) => {
    if (month < 10) {
      month = "2024-0" + month;
    } else {
      month = "2024-" + month;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/${user.familyId}/category/average/${month}`
      );
      setBudget(response.data);
      console.log("기본 예산 데이터를 가져왔습니다:", response.data);
    } catch (error) {
      console.error("기본 예산 데이터를 가져오는 중 오류 발생", error);
    }
  };

  // 특정 카테고리의 거래 내역을 백엔드에서 가져오는 함수
  const fetchTransactionsByCategory = async (categoryId, month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/${user.familyId}/category/${categoryId}/transactions/${month}`
      );
      setTransactions(response.data); // 거래 내역 데이터를 설정
      setTransactionModalVisible(true); // 거래 내역 모달 표시
    } catch (error) {
      console.error("거래 내역을 가져오는 중 오류 발생", error);
    }
  };

  // 카테고리를 클릭하면 거래 내역 모달을 보여주는 함수
  const showTransactionModal = (category) => {
    setCurrentCategory(category); // 클릭된 카테고리 설정
    fetchTransactionsByCategory(category, selectedMonth); // 거래 내역 가져오기
  };

  // 카테고리 자동 분류 요청 함수
  const handleAutoCategoryClassification = async () => {
    setLoadingCategory(true); // 로딩 시작
    setCategoryModalVisible(true); // 카테고리 분류 모달 열기
    try {
      // 카테고리 자동 분류 API 호출 (모델을 돌려 자동 분류하는 백엔드 요청)
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/6/transactions/9`
      );
      // console.log(response.data);
      setTimeout(() => {
        setLoadingCategory(false); // 로딩 종료
        setClassifiedTransactions(response.data); // 분류된 거래 내역 저장
      }, 3000); // 3초 딜레이 후 분류된 거래 내역 보여주기
    } catch (error) {
      console.error("자동 분류 중 오류 발생", error);
      message.error("카테고리 자동 분류에 실패했습니다.");
      setLoadingCategory(false);
      setCategoryModalVisible(false); // 모달 닫기
    }
  };

  // 예산 수정 모달을 표시하는 함수
  const showModal = (category) => {
    setCurrentCategory(category);
    setNewBudget(category.budgetAmount); // 현재 예산을 새로운 예산의 초기값으로 설정
    setIsModalVisible(true);
  };

  // 예산 수정 확인 시 처리하는 함수
  const handleOk = async () => {
    if (newBudget < currentCategory.actualAmount) {
      message.error("실제 사용 금액보다 작은 예산을 설정할 수 없습니다.");
      return;
    }

    try {
      // 백엔드에서 예산을 업데이트
      await axios.put(
        `http://localhost:8080/api/budget/family/${user.familyId}/update/${selectedMonth}`,
        {
          budgetId: currentCategory.budgetId,
          budgetAmount: newBudget,
        }
      );

      // 예산 수정 후 예산 데이터를 다시 가져옴
      fetchBudgetByfamilyId(selectedMonth);
      setIsModalVisible(false); // 모달 닫기
      message.success("예산이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("예산 수정 중 오류 발생", error);
      message.error("예산 수정에 실패했습니다.");
    }
  };

  // 카테고리 변경 확인 함수 (백엔드로 전송)
  const handleConfirmCategoryChange = async (transactionId) => {
    try {
      // 백엔드로 업데이트 요청
      await axios.put(
        `http://localhost:8080/api/budget/family/${user.familyId}/update-category/${selectedMonth}`,
        {
          transactionId: transactionId,
          category: selectedCategory, // 선택한 카테고리 값
        }
      );
      message.success("카테고리가 성공적으로 업데이트되었습니다!");
      fetchTransactionsByCategory(currentCategory.categoryId, selectedMonth); // 거래 내역을 다시 가져옴
    } catch (error) {
      console.error("카테고리 업데이트 중 오류 발생", error);
      message.error("카테고리 업데이트에 실패했습니다.");
    }
  };

  // 모달 닫기 처리
  const handleCancel = () => {
    setIsModalVisible(false);
    setTransactionModalVisible(false);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value); // 선택된 월을 변경
    fetchBudgetByfamilyId(value); // 선택된 월의 데이터를 다시 가져옴
  };

  const columns = [
    {
      title: "카테고리",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text, record) => (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => showTransactionModal(record.categoryId)} // 거래 내역 모달 표시
        >
          {record.icon}
          <span style={{ marginLeft: "10px" }}>{record.categoryName}</span>
        </div>
      ),
    },
    {
      title: "진행률",
      key: "progress",
      render: (text, record) => {
        // actualAmount 기반 총 진행률 계산
        const totalProgress =
          ((record.actualAmount + record.eventAmount) / record.budgetAmount) *
          100;

        const actualProgress =
          (record.actualAmount / record.budgetAmount) * 100;

        // eventAmount 기반 이벤트 진행률 계산
        const eventProgress = (record.eventAmount / record.budgetAmount) * 100;

        // 진행률에 따른 색상 설정
        let progressColor = "";
        if (totalProgress < 40) {
          progressColor = "#00bc9c"; // 초록색
        } else if (totalProgress < 80) {
          progressColor = "#ffcc00"; // 노랑색
        } else {
          progressColor = "#ff4d4f"; // 빨간색
        }

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <div style={{ position: "relative", width: "150px" }}>
              {/* 이벤트 관련 진행률 (오렌지색) */}
              <Progress
                percent={Math.round(totalProgress)}
                strokeColor="#ff7a45"
                showInfo={false}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 0,
                }}
              />

              {/* 총 진행률 (이벤트 + 실제 진행률) */}
              <Progress
                percent={Math.round(actualProgress)}
                strokeColor={progressColor}
                showInfo={false}
                style={{
                  position: "relative",
                  width: "100%",
                  zIndex: 1,
                }}
              />
            </div>
            <span>{totalProgress.toFixed(2)}%</span>
          </div>
        );
      },
    },
    {
      title: "총 예산",
      dataIndex: "budgetAmount",
      key: "budgetAmount",
      render: (budgetAmount) =>
        budgetAmount ? `₩ ${Math.round(budgetAmount).toLocaleString()}` : "₩ 0",
    },
    {
      title: "작업",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => showModal(record)}>예산 수정</Button>
      ),
    },
  ];

  // 거래 내역 테이블 컬럼 설정
  const transactionColumns = [
    {
      title: "가맹점",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "금액",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      render: (amount) => `$ ${amount.toLocaleString()}`,
    },
    {
      title: "카테고리",
      key: "category",
      render: (text, record) => (
        // console.log(category.categoryId),
        // console.log(category.categoryName),
        <Space>
          {/* 거래 내역의 현재 카테고리로 기본값 설정 */}
          <Select
            defaultValue={defaultCategories[record.category - 1].categoryName}
            onChange={(value) => setSelectedCategory(value)} // 선택한 값을 상태에 저장
            style={{ width: 150 }}
          >
            {defaultCategories.map((category) => (
              <Option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Option>
            ))}
          </Select>

          {/* 카테고리 변경 후 확인 버튼 */}
          <Button
            type="primary"
            onClick={() => handleConfirmCategoryChange(record.transactionId)} // 확인 버튼 클릭 시 백엔드로 전송
          >
            확인
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>카테고리별 예산 / 지출</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* 월 선택 드롭다운 */}
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: 120, marginBottom: "20px" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Option key={i + 1} value={i + 1}>
              {i + 1}월
            </Option>
          ))}
        </Select>
        <div>
          {/* 카테고리 추가 버튼 */}
          <Button onClick={showAddCategoryModal}>카테고리 추가</Button>
          <Button
            onClick={handleAutoCategoryClassification}
            style={{ marginLeft: "10px" }}
          >
            카테고리 자동 분류
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={budget} pagination={false} />
      {/* 카테고리 추가 모달 */}
      <Modal
        title="카테고리 추가"
        visible={addCategoryModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setAddCategoryModalVisible(false)}
      >
        <Select
          placeholder="카테고리를 선택하세요"
          style={{ width: "100%", marginBottom: "20px" }}
          onChange={(value) => setNewCategory(value)}
        >
          {defaultCategories.map((category) => (
            <Option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </Option>
          ))}
        </Select>
        <InputNumber
          placeholder="예산 금액을 입력하세요"
          style={{ width: "100%" }}
          value={newCategoryBudget}
          onChange={(value) => setNewCategoryBudget(value)}
        />
      </Modal>
      {/* 예산 수정 모달 */}
      <Modal
        title={`Edit Budget for ${currentCategory?.categoryName || ""}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          현재 예산: $ {currentCategory?.budgetAmount?.toLocaleString() || "0"}
        </p>
        <p>
          사용 금액: ${currentCategory?.actualAmount?.toLocaleString() || "0"}
        </p>
        <InputNumber
          min={currentCategory?.actualAmount || 0}
          value={newBudget}
          onChange={(value) => setNewBudget(value)}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Modal>
      {/* 거래 내역 모달 */}
      <Modal
        title={`Transactions for ${currentCategory?.categoryName || ""}`}
        visible={transactionModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            닫기
          </Button>,
        ]}
      >
        <Table
          columns={transactionColumns}
          dataSource={transactions}
          pagination={false}
        />
      </Modal>
      <Modal
        title="카테고리 자동 분류"
        visible={categoryModalVisible} // categoryModalVisible 상태를 사용하여 모달을 제어
        onCancel={() => setCategoryModalVisible(false)} // 모달 닫기
        footer={null} // 모달의 하단 버튼을 제거
      >
        {loadingCategory ? (
          <div style={{ textAlign: "center" }}>
            <p>카테고리를 분류하고 있어요...</p>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>카테고리 자동 분류가 완료되었습니다!</p>
            <Table
              columns={transactionColumns}
              dataSource={classifiedTransactions}
              pagination={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default CategoryBudget;
