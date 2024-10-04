import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/HomeSection2.css";
import ReactCardFlip from "react-card-flip";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function HomeSection2() {
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);

  const title = `${process.env.PUBLIC_URL}/img/img-cont-title.png`;
  const main1 = `${process.env.PUBLIC_URL}/img/main-1.png`;
  const main2 = `${process.env.PUBLIC_URL}/img/main-2.png`;
  const main3 = `${process.env.PUBLIC_URL}/img/main-3.png`;
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
              <Link to="/auth">
                <Button variant="dark" size="lg">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginTop: "auto", marginBottom: "auto" }}>
                      가입하러 가기
                    </p>
                    <IoIosArrowForward />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="card-box-wrap">
              {/* 카드들 */}
              <a key="1" href="/" className={`flip-card-item type-01`}>
                <ReactCardFlip
                  isFlipped={eval(`isFlipped1`)}
                  flipDirection="horizontal"
                >
                  <div
                    className="card-front"
                    onMouseEnter={() => eval(`setIsFlipped1(true)`)}
                  >
                    <div className="card-content">
                      <p className="card-label">자산관리</p>
                      <h3 className="card-title text-black mb-3">
                        가족 자산 관리
                      </h3>
                      <div className="card-description">
                        <p># 대시보드</p>
                        <p># 가족 초대</p>
                        <p># 함께 관리</p>
                      </div>
                      <div className="card-img">
                        <img src={main1} alt="main1" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-back"
                    onMouseLeave={() => eval(`setIsFlipped1(false)`)}
                  >
                    <div className="card-content">
                      <p className="card-label2">자산관리</p>
                      <h3 className="card-title text-white mb-5">
                        가족 자산 관리
                      </h3>
                      <div className="card-description mb-4">
                        <p className="text-white">마이데이터를 통한</p>
                        <h3 className="text-white font-bold">
                          원하는 자산만 공유
                        </h3>
                      </div>
                    </div>
                  </div>
                </ReactCardFlip>
              </a>
              <a key="2" href="/" className={`flip-card-item type-02`}>
                <ReactCardFlip
                  isFlipped={eval(`isFlipped2`)}
                  flipDirection="horizontal"
                >
                  <div
                    className="card-front"
                    onMouseEnter={() => eval(`setIsFlipped2(true)`)}
                  >
                    <div className="card-content">
                      <p className="card-label">적금</p>
                      <h3 className="card-title text-black mb-3">함께 적금</h3>
                      <div className="card-description">
                        <p># 목표금액까지</p>
                        <p># 가족과 함께</p>
                        <p># 목돈 모으기</p>
                      </div>
                      <div className="card-img">
                        <img src={main2} alt="main2" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-back"
                    onMouseLeave={() => eval(`setIsFlipped2(false)`)}
                  >
                    <div className="card-content">
                      <p className="card-label2">적금</p>
                      <h3 className="card-title text-white mb-4">함께 적금</h3>
                      <div className="card-description mb-4">
                        <p className="text-white">금리(연)</p>
                        <h3 className="text-white font-bold">3.00%</h3>
                      </div>
                      <div className="card-description">
                        <p className="text-white">가입기간</p>
                        <h3 className="text-white font-bold">
                          최소 3개월 ~ 최대 1년
                        </h3>
                      </div>
                    </div>
                  </div>
                </ReactCardFlip>
              </a>
              <a key="3" href="/" className={`flip-card-item type-03`}>
                <ReactCardFlip
                  isFlipped={eval(`isFlipped3`)}
                  flipDirection="horizontal"
                >
                  <div
                    className="card-front"
                    onMouseEnter={() => eval(`setIsFlipped3(true)`)}
                  >
                    <div className="card-content ">
                      <p className="card-label">가계부</p>
                      <h3 className="card-title text-black mb-3">
                        가계부 & 일정 관리
                      </h3>
                      <div className="card-description">
                        <p># 소비내역 분석</p>
                        <p># 예산 설정</p>
                        <p># 일정 관리</p>
                      </div>
                      <div className="card-img">
                        <img
                          src={main3}
                          alt="main3"
                          className="w-[250px] h-[130px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-back"
                    onMouseLeave={() => eval(`setIsFlipped3(false)`)}
                  >
                    <div className="card-content">
                      <p className="card-label2">가계부</p>
                      <h3 className="card-title text-white mb-5">
                        가계부 & 일정 관리
                      </h3>
                      <div className="card-description mb-5">
                        <p className="text-white">가계부</p>
                        <h5 className="text-white font-bold">
                          소비내역 확인 및 예산 관리
                        </h5>
                      </div>
                      <div className="card-description">
                        <p className="text-white">일정 관리</p>
                        <h5 className="text-white font-bold">
                          알림을 통한 가족 일정 관리
                        </h5>
                      </div>
                    </div>
                  </div>
                </ReactCardFlip>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
