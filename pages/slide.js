import { useEffect, useState } from "react";
import { createContext } from "react";
import { Slider } from "../components/Slider";

import { sliderData } from "../components/slider-data.jsx";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";

export const autoPlayContext = createContext();

export default function Slide() {
  const [autoPlay, setAutoPlay] = useState(true);

  return (
    <>
      <autoPlayContext.Provider value={[autoPlay, setAutoPlay]}>
        <Header />
        <div className="line-2"></div>
        <div className="app">{<Slider />}</div>
      </autoPlayContext.Provider>
      <style jsx>
        {`
          a {
            color: #7d7d7d;
            font-size: 12px;
            font-weight: 700;
            line-height: 19px;
            text-decoration: none;
          }
          a:hover {
            color: #000000;
          }
          .navbar {
            align-items: center;
            display: flex;
            height: 10vh;
            justify-content: space-around;
            width: 90vw;
          }
          .line-2 {
            border-top: 1px solid #e5e5e5;
            width: 100%;
            margin: auto;
          }
          .app {
            width: 70vw;
            height: 70vh;
            margin: 4rem auto;
          }



          @media (min-width: 767px) and (max-width: 1200px) {
            .app {
              width: 80vw;
              height: 70vh;
              margin:1rem auto;
            }
          }
            @media (max-width: 767px) {
              .app {
                width: 100%
                height: 100%;
              }

            }
        `}
      </style>
    </>
  );
}
