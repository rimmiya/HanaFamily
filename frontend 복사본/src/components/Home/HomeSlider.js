import React from "react";
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
  const tmp_home = `${process.env.PUBLIC_URL}/img/tmp_home.png`;
  return (
    <div className="section-1">
      <div className="slide-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }} // 3초마다 자동 슬라이드 전환
          speed={1300}
          onSlideChangeTransitionStart={(swiper) => {
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
                <h2>내 자산</h2>
                <h1>편리하게 한번에 내 자산 확인</h1>
                <p>
                  하나패밀리에서 편리하고 안전한 금융 서비스를 경험해보세요.
                </p>
              </div>
              <div className="image-content">
                <img src={tmp_home} alt="Slide 1 Image" />
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
                <img src={tmp_home} alt="Slide 2 Image" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="text-content">
                <h2>함께 관리</h2>
                <h1>함께 모아야 빨리 모은다</h1>
                <p>함께 관리로 우리 가족자산 늘려봐요.</p>
              </div>
              <div className="image-content">
                <img src={tmp_home} alt="Slide 3 Image" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
