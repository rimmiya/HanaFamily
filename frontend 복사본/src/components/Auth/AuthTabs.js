import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "../../style/AuthTabs.css";

function AuthTabs({ activeTab, onTabChange }) {
  const [targets, setTargets] = useState({
    active: 0,
    old: null,
  });

  const slider = useRef(null);
  const targetEls = useRef([]);

  useEffect(() => {
    const activeTitle = targetEls.current[targets.active];
    gsap.set(slider.current, {
      x: activeTitle.offsetLeft,
      width: activeTitle.offsetWidth,
    });
  }, [targets.active]);

  const handleClick = (index) => {
    if (targets.active === index) {
      return;
    }

    setTargets((oldTargets) => ({
      active: index,
      old: oldTargets.active,
    }));

    // 외부로 탭 변경 알림
    const tabNames = ["login", "findId", "register"];
    onTabChange(tabNames[index]);
  };

  const getSliderPosition = () => {
    switch (activeTab) {
      case "login":
        return 0;
      case "findId":
        return 1;
      case "register":
        return 2;
      default:
        return 0;
    }
  };

  useEffect(() => {
    setTargets((oldTargets) => ({
      ...oldTargets,
      active: getSliderPosition(),
    }));
  }, [activeTab]);

  return (
    <div className="tabs-container">
      <ul className="tabs-block">
        <div className="slider" ref={slider} />
        <li
          ref={(el) => (targetEls.current[0] = el)}
          className={targets.active === 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          로그인
        </li>
        <li
          ref={(el) => (targetEls.current[1] = el)}
          className={targets.active === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          아이디/비밀번호 찾기
        </li>
        <li
          ref={(el) => (targetEls.current[2] = el)}
          className={targets.active === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          회원가입
        </li>
      </ul>
    </div>
  );
}

export default AuthTabs;
