import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../style/HomeSlider.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function HomeSlider() {
  const slide1 = `${process.env.PUBLIC_URL}/img/slide-1.png`;
  const slide2 = `${process.env.PUBLIC_URL}/img/slide-2.png`;
  const slide3 = `${process.env.PUBLIC_URL}/img/slide-3.png`;

  // 배경색을 관리하는 상태 추가
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(135deg, rgba(211,248,210,1) 0%, rgba(146,228,200,1) 49%, rgba(60,204,180,1) 100%)"
  ); // 초기 배경 그라데이션 설정

  // 각 슬라이드에 대응하는 그라데이션 배열
  const slideBackgroundGradients = [
    "linear-gradient(135deg, rgba(211,248,210,1) 0%, rgba(146,228,200,1) 49%, rgba(60,204,180,1) 100%)",
    "linear-gradient(135deg, rgba(249,233,255,1) 0%, rgba(223,220,255,1) 49%, rgba(185,198,253,1) 100%)",
    "linear-gradient(135deg, rgba(255,235,215,0.7049413515406162) 0%, rgba(239,186,133,0.5928965336134453) 49%, rgba(240,187,134,0.5704875700280112) 100%)",
  ]; // 각 슬라이드에 대응하는 그라데이션 값들

  return (
    <div
      className="section-1"
      style={{
        backgroundImage: bgGradient, // 그라데이션으로 배경 변경
        transition: "background-image 1s ease", // 부드러운 전환을 위한 transition
      }}
    >
      <div className="slide-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }} // 3초마다 자동 슬라이드 전환
          speed={1300}
          onSlideChange={(swiper) => {
            // 슬라이드가 바뀔 때 배경 그라데이션을 업데이트
            const newBgGradient = slideBackgroundGradients[swiper.activeIndex];
            setBgGradient(newBgGradient);

            // 이미지에만 애니메이션 적용
            document
              .querySelectorAll(".image-content img")
              .forEach((image, index) => {
                if (index === swiper.activeIndex) {
                  image.classList.remove("slide-out-left", "slide-out-right");
                  image.classList.add(
                    swiper.swipeDirection === "next"
                      ? "slide-in-right"
                      : "slide-in-left"
                  );
                } else {
                  image.classList.remove("slide-in-left", "slide-in-right");
                  image.classList.add(
                    swiper.swipeDirection === "next"
                      ? "slide-out-left"
                      : "slide-out-right"
                  );
                }
              });
          }}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="text-content">
                <h2>함께 관리</h2>
                <h1>편리하게 우리 가족 자산 확인</h1>
                <p>하나패밀리에서 편리하고 금융 서비스를 경험해보세요.</p>
              </div>
              <div className="image-content">
                <img src={slide1} alt="Slide 1 Image" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="text-content">
                <h2>가계부</h2>
                <h1>가계부로 꼼꼼하게 관리하기</h1>
                <p>내 월급 어디로 갔지?</p>
              </div>
              <div className="image-content">
                <img src={slide2} alt="Slide 2 Image" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="text-content">
                <h2>함께 적금</h2>
                <h1>함께 모아야 빨리 모아요</h1>
                <p>함께 적금으로 목표 금액 모아봐요</p>
              </div>
              <div className="image-content">
                <img src={slide3} alt="Slide 3 Image" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
