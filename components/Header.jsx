import { useState, useContext, useEffect } from "react";
import { Slider } from "../components/Slider";
import { autoPlayContext } from "../pages/slide.js";

export function Header({}) {
  const [autoPlay, setAutoPlay] = useContext(autoPlayContext);

  function toggle() {
    setAutoPlay(!autoPlay);
  }
  useEffect(() => {
    console.log(autoPlay);
  });
  return (
    <>
      <div className="navbar">
        <a href="#">
          <img src="../assets/shared/logo.svg" alt="galleria" />
        </a>

        <button
          className="button"
          type="button"
          title="slide show"
          onClick={toggle}
        >
          {!autoPlay ? "START SLIDESHOW" : "STOP SLIDESHOW"}
        </button>
      </div>
      <style jsx>{`
        .navbar {
          display: flex;
          height: 5vh;
          justify-content: space-between;
          align-items: center;
          width: 85vw;
          margin: 2rem;
        }
        .button {
          color: #7d7d7d;
          background-color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          line-height: 19px;
          text-decoration: none;
          border: none;
        }
        .button:hover {
          color: #000000;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
