import React from "react";
import "../../style/HomeSection3.css";
import { InstagramEmbed } from "react-social-media-embed";

function HomeSection3() {
  return (
    <div className="home-section-3">
      <div className="youtube">
        <div className="youtube-title">하나금융그룹 공식 유튜브</div>
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
      </div>
      <div className="instagram">
        <div className="instagram-title">하나금융그룹 공식 인스타그램</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/C-2N7uUy2ZZ/"
            width={328}
          />
        </div>
      </div>
    </div>
  );
}
export default HomeSection3;
