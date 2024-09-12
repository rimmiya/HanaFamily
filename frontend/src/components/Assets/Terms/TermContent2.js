import React from "react";

function TermsContent2() {
  const styles = {
    container: {
      maxWidth: "850px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    h3: {
      fontSize: "18px",
      marginTop: "20px",
      marginBottom: "10px",
      color: "#000000",
    },
    paragraph: {
      marginBottom: "16px",
      textAlign: "left",
      color: "black",
    },
    listItem: {
      marginBottom: "8px",
      textAlign: "left",
      color: "black",
    },
    ol: {
      listStyleType: "decimal",
      paddingLeft: "20px",
      color: "black",
    },
    ul: {
      listStyleType: "disc",
      paddingLeft: "40px",
      color: "black",
    },
    finalNote: {
      fontStyle: "italic",
      fontWeight: "bold",
      marginTop: "20px",
      textAlign: "left",
      color: "black",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.paragraph}>
        본 약관에 따라 개인정보 및 신용정보의 수집과 이용에 대해 다음과 같이
        동의합니다:
      </p>

      <h3 style={styles.h3}>1. 개인정보의 수집 목적</h3>
      <p style={styles.paragraph}>
        당사는 이용자의 금융거래 및 서비스 이용과 관련된 신용정보를 수집하여, 본
        서비스를 제공하고, 금융상품 추천 및 자산관리 서비스를 수행하기 위해
        개인정보를 수집합니다.
      </p>

      <h3 style={styles.h3}>2. 수집하는 개인정보 항목</h3>
      <ul style={styles.ul}>
        <li style={styles.listItem}>
          1) 이름, 연락처, 주소, 생년월일 등 기본 정보
        </li>
        <li style={styles.listItem}>
          2) 금융거래내역, 계좌정보, 대출정보, 보험가입정보 등
        </li>
        <li style={styles.listItem}>3) 본인인증 시 필요한 인증정보</li>
      </ul>

      <h3 style={styles.h3}>3. 개인정보의 이용 목적</h3>
      <p style={styles.paragraph}>
        수집된 개인정보는 다음과 같은 목적으로 이용됩니다:
      </p>
      <ol style={styles.ol}>
        <li style={styles.listItem}>서비스 제공 및 본인 인증 절차 수행</li>
        <li style={styles.listItem}>맞춤형 금융 상품 추천</li>
        <li style={styles.listItem}>
          자산관리 서비스 제공을 위한 통계 및 분석
        </li>
      </ol>

      <h3 style={styles.h3}>4. 개인정보 보유 및 이용 기간</h3>
      <p style={styles.paragraph}>
        당사는 관련 법령에 따라 이용자의 개인정보를 안전하게 보관하며, 서비스
        제공을 위해 필요한 기간 동안 이용자의 정보를 보유합니다. 보유 기간이
        경과한 개인정보는 즉시 파기됩니다.
      </p>

      <h3 style={styles.h3}>5. 동의 철회 및 개인정보 삭제</h3>
      <p style={styles.paragraph}>
        이용자는 언제든지 개인정보 수집 및 이용 동의를 철회할 수 있으며, 동의
        철회 시에는 관련 법령에 따라 보유된 개인정보를 즉시 삭제합니다.
      </p>

      <p style={styles.finalNote}>
        본 동의서에 대한 내용을 충분히 이해하였으며, 이에 동의합니다.
      </p>
    </div>
  );
}

export default TermsContent2;
