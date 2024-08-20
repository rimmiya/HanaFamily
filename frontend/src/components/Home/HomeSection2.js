import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/HomeSection2.css";
import ReactCardFlip from "react-card-flip";
import { IoIosArrowForward } from "react-icons/io";

function HomeSection2() {
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);

  const title = `${process.env.PUBLIC_URL}/img/img-cont-title.png`;
  return (
    <div className="home-section-2">
      <div className="section-2-content">
        <div className="content-wrapper">
          <div className="left">
            <div className="title-box">
              <img src={title} alt="title" />
            </div>
            <p className="desc">
              하나패밀리에서
              <br /> 쉽고 편하게 자산관리 해보세요 !
            </p>
            <div className="btn-box">
              <Button variant="dark" size="lg">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginTop: "auto", marginBottom: "auto" }}>
                    가입하러 가기
                  </p>
                  <IoIosArrowForward />
                </div>
              </Button>
            </div>
          </div>
          <div className="right">
            <div className="card-box-wrap">
              {/* 카드들 */}
              {[1, 2, 3].map((index) => (
                <a
                  key={index}
                  href="/"
                  className={`flip-card-item type-0${index}`}
                >
                  <ReactCardFlip
                    isFlipped={eval(`isFlipped${index}`)}
                    flipDirection="horizontal"
                  >
                    <div
                      className="card-front"
                      onMouseEnter={() => eval(`setIsFlipped${index}(true)`)}
                    >
                      <div className="card-content">
                        <h2>{`상품 정보 ${index}`}</h2>
                        <p>이곳은 상품에 대한 간략한 설명입니다.</p>
                      </div>
                    </div>
                    <div
                      className="card-back"
                      onMouseLeave={() => eval(`setIsFlipped${index}(false)`)}
                    >
                      <div className="card-content">
                        <h2>{`자세한 정보 ${index}`}</h2>
                        <p>이곳은 상품에 대한 자세한 설명입니다.</p>
                      </div>
                    </div>
                  </ReactCardFlip>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
