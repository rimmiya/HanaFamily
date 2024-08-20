import React from "react";
import "../../style/HomeSection3.css";
import { Swiper, SwiperSlide } from "swiper/react";
// import { InstagramEmbed } from "react-social-media-embed";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar, Autoplay, EffectCreative } from "swiper/modules";
// import required modules
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

function HomeSection3() {
  const img_youtube = `${process.env.PUBLIC_URL}/img/img-hana-youtube.png`;
  const img_instagram = `${process.env.PUBLIC_URL}/img/img-hana-instagram.png`;
  return (
    <div className="home-section-3">
      <div className="section-inner">
        <div className="youtube-title">하나금융그룹 공식 유튜브</div>
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              translate: ["-120%", 0, -300],
              opacity: 0.5,
            },
            next: {
              translate: ["120%", 0, -300],
              opacity: 0.5,
            },
          }}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={5} // 이 값을 필요에 맞게 조정하세요.
          scrollbar={{ draggable: true }}
          modules={[Scrollbar, Autoplay, EffectCreative]}
          autoplay={{ delay: 3500 }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="youtube-content">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GVcxDCUJbaQ?si=YfBTL3oKfBk_IXFM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* <div className="instagram">
        <img
          src={img_instagram}
          className="instagram-title"
          alt="하나금융그룹 공식 인스타그램"
        ></img>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/C-2N7uUy2ZZ/"
            width={328}
          />
        </div>
      </div> */}
      </div>
    </div>
  );
}
export default HomeSection3;
