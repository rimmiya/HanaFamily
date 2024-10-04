import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay, EffectCreative } from "swiper/modules";

function HomeSection3() {
  const youtubeVideos = [
    "https://www.youtube.com/embed/lxAmSLKwbII?si=o4hJIQv-lfR_EjDr",
    "https://www.youtube.com/embed/cupwULZY15c?si=BzYRSSUjytRM6DAI",
    "https://www.youtube.com/embed/k7xWHh3MCmo?si=dudaK3pXIznCM3kb",
    "https://www.youtube.com/embed/tXk8KcrxFII?si=4WWXJEkG588yDXr3",
    "https://www.youtube.com/embed/jUSb4jdjci4?si=cGCvTgxtRayiThuh",
    // 원하는 만큼 추가할 수 있습니다.
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "space-around",
        marginTop: "50px",
        marginBottom: "100px",
        backgroundColor: "rgb(227, 227, 227)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            fontFamily: "CustomFont",
            fontSize: "35px",
            borderBottom: "1px solid black",
            marginBottom: "20px",
            color: "black",
          }}
        >
          하나금융그룹 공식 유튜브
        </div>

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
          spaceBetween={5}
          scrollbar={{ draggable: true }}
          modules={[Scrollbar, Autoplay, EffectCreative]}
          autoplay={{ delay: 3500 }}
          className="mySwiper"
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {youtubeVideos.map((videoUrl, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "450px",
                  height: "70%",
                  maxWidth: "700px",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title={`YouTube video ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSection3;
