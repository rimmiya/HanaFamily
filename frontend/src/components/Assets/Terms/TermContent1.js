import React from "react";

function TermsContent1() {
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
    ol: {
      listStyleType: "decimal",
      paddingLeft: "20px",
      marginBottom: "16px",
      textAlign: "left",
      color: "black",
    },
    ul: {
      listStyleType: "disc",
      paddingLeft: "40px",
      marginBottom: "16px",
      textAlign: "left",
      color: "black",
    },
    li: {
      marginBottom: "8px",
      textAlign: "left",
      color: "black",
    },
    bold: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.h3}>제 1 조 (목적)</h3>
      <p style={styles.paragraph}>
        이 약관은 주식회사 하나은행(이하 “은행”이라 합니다)과 “은행”이 제공하는
        “마이데이터 서비스”(이하 “서비스”라 합니다)를 이용하는 고객(이하
        ”이용자” 라 합니다) 사이의 권리, 의무 및 책임 사항, “서비스” 제공에 관한
        제반 사항을 규정함을 목적으로 합니다.
      </p>

      <h3 style={styles.h3}>제 2 조 (용어의 정의)</h3>
      <ol style={styles.ol}>
        <li style={styles.li}>
          <span style={styles.bold}>“서비스”</span>란 “이용자”의 “개인신용정보”
          전송요구에 따라 은행, 카드, 보험, 증권, 통신 업권 또는 공공기관 등에
          분산된 이용자의 금융정보 등의 “개인신용정보”를 통합하여 제공하는
          통합조회 서비스, 자산관리 서비스, 지출관리 서비스, 기타 “은행”이
          제공하는 서비스를 의미합니다.
        </li>
        <li style={styles.li}>
          <span style={styles.bold}>“이용자”</span>는 이 약관에 따라 “은행”과
          이용 계약을 체결하고 “은행”으로부터 “서비스” 이용 자격을 부여받은
          고객을 의미합니다.
        </li>
        <li style={styles.li}>
          <span style={styles.bold}>“개인신용정보”</span>란 금융거래 등
          상거래에서 개인인 신용정보주체의 신용, 거래내용, 거래능력을 판단할 수
          있는 정보를 말합니다.
        </li>
        <li style={styles.li}>
          <span style={styles.bold}>“정보제공자”</span>란 『신용정보의 이용 및
          보호에 관한 법률』 제33조의2 조에 따라 신용정보를 전송할 의무가
          있으며, 이러한 의무에 따라 “이용자”의 “개인신용정보”를 전송하는 자를
          말합니다.
        </li>
      </ol>

      <h3 style={styles.h3}>제 3 조 (서비스의 가입)</h3>
      <p style={styles.paragraph}>
        ① “은행”과 “이용자” 사이의 서비스 이용계약(이하 “이용계약”이라 합니다)은
        “이용자”가 되고자 하는 고객(이하 “가입신청자”라 합니다)이 “은행”이 정한
        양식에 따라 가입신청을 하고 “은행”이 이에 대해 승낙함으로써 체결됩니다.
      </p>
      <p style={styles.paragraph}>
        ② “은행”은 “가입신청자”의 가입신청이 다음 각 호의 어느 하나에 해당하는
        사유가 발생하거나 확인된 경우 이를 승낙하지 않을 수 있습니다.
      </p>
      <ul style={styles.ul}>
        <li style={styles.li}>
          1. 사용자가 과거에 이 약관을 위반하여 서비스 이용계약을 해지당한 경우
        </li>
        <li style={styles.li}>2. 만 19세 미만의 자가 가입 신청하는 경우</li>
      </ul>

      {/* 나머지 약관 내용 생략 */}
    </div>
  );
}

export default TermsContent1;
