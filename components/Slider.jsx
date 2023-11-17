import { useState, useEffect, useRef, useContext } from "react";
import { sliderData } from "./slider-data.jsx";
import { autoPlayContext } from "../pages/slide";
import { Modal } from "./Modal";

export function Slider({}) {
  const [progress, setProgress] = useState(0);
  const slideLength = sliderData.length;
  const [slideToShow, setSlideToShow] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [clickedImg, setClickedImg] = useState(null);
  const handleClick = (elem, index) => {
    setCurrentIndex(index);
    setClickedImg(elem.images.gallery);
  };
  //currentSlide=0 1 2
  //slideLength=1 2 3
  const [autoPlay, setAutoPlay] = useContext(autoPlayContext);
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const next = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    setProgress(Math.round(((currentSlide + 1) / slideLength) * 100));
  };

  function prev() {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    setProgress(Math.round(((currentSlide - 1) / slideLength) * 100));
  }

  const timerRef = useRef(null);

  //logic of stop and start slideshow button from
  // //https://stackoverflow.com/questions/61274195/how-to-use-an-onclick-event-to-stop-calling-a-function-which-is-called-by-the

  useEffect(() => {
    if (!autoPlay) {
      clearTimeout(timerRef.current);
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    console.log("fired");
    timerRef.current = setTimeout(() => {
      next();
    }, 5000);
    return () => clearTimeout(timerRef.current);
  }, [currentSlide, autoPlay]);

  return (
    <>
      <div className="outer-container">
        <div className="slider-container">
          {sliderData.map(function (elem, index) {
            return (
              <div
                className={index === currentSlide ? "slider current" : "slider"}
                key={index}
              >
                {index === currentSlide && (
                  <div className="slide">
                    <img
                      className="image"
                      src={elem.images.hero.small}
                      alt="image"
                    />

                    <div className="container-one">
                      <div className="details-one">
                        <h1 className="picture-name">{elem.name}</h1>
                        <h3 className="picture-artist">{elem.artist.name}</h3>
                      </div>
                      <img
                        className="artist-image"
                        width="100px"
                        height="100px"
                        src={elem.artist.image}
                        alt="artist"
                      />
                    </div>

                    <div
                      className="overlay-button"
                      onClick={() => handleClick(elem, index)}
                    >
                      <svg
                        width="15"
                        height="15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="#fff" fill-rule="nonzero">
                          <path d="M7.714 0l1.5 1.5-2.357 2.357 1.286 1.286L10.5 2.786l1.5 1.5V0zM3.857 6.857L1.5 9.214 0 7.714V12h4.286l-1.5-1.5 2.357-2.357zM8.143 6.857L6.857 8.143 9.214 10.5l-1.5 1.5H12V7.714l-1.5 1.5zM4.286 0H0v4.286l1.5-1.5 2.357 2.357 1.286-1.286L2.786 1.5z" />
                        </g>
                      </svg>
                      <div
                        style={{
                          width: "120px",
                          height: "13px",
                        }}
                      >
                        <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                          VIEW IMAGE
                        </span>
                      </div>
                    </div>
                    <div className="container-two">
                      <div className="picture-year">{elem.year}</div>
                      <div className="picture-description">
                        {elem.description}
                        <div>
                          <a className="source-link" href={elem.source}>
                            GO TO SOURCE
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="progress-bar-container">
          <div className="line-2"></div>
          <div className="line-3" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="footer-container">
          <div className="">
            {sliderData.map(function (elem, index) {
              return (
                <div
                  className={
                    index === currentSlide ? "slider current" : "slider"
                  }
                  key={index}
                >
                  {index === currentSlide && (
                    <div>
                      <p className="footer-name">{elem.name}</p>
                      <p className="footer-artist">{elem.artist.name}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="button-container">
            <svg
              className="arrow prev"
              width="26"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={prev}
            >
              <g stroke="#000" fill="none" fill-rule="evenodd">
                <path
                  d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z"
                  stroke-width="2"
                />
                <path fill="#D8D8D8" d="M.986.5h-1v22.775h1z" />
              </g>
            </svg>
            <svg
              className="arrow next"
              width="26"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={next}
            >
              <g stroke="#000" fill="none" fill-rule="evenodd">
                <path
                  d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z"
                  stroke-width="2"
                />
                <path fill="#D8D8D8" d="M24.708.5h1v22.775h-1z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="wrapper">
        {clickedImg && (
          <Modal clickedImg={clickedImg} setClickedImg={setClickedImg} />
        )}
      </div>

      <style jsx>{`
        .outer-container {
          text-align: center;
          width: 80vw;
          height: 70vh;
        }
        .slider-container {
          display: flex;
          width: 80vw;
          height: 70vh;
        }
        .slider {
          opacity: 0;
          transform: translateX(-50%);
          transition: all 0.5s ease;
        }
        .slide {
          width: 100%;
          height: 100%;
          z-index: -1;
          display: flex;
          flex-direction: row;
        }

        .image {
          width: 70%;
          height: 100%;
        }

        .container-one {
          width: 100%;
          height: 30%;
          display: flex;
          align-items: space-between;
          justify-content: space-between;
        }
        .details-one {
          width: 100%;

          background-color: #ffffff;
          position: relative;
          left: -16%;
        }
        .container-two {
          width: 100%;
          height: 30%;
        }

        .picture-name {
          font-size: 56px;
          font-weight: bold;
          line-height: 64px;
          text-align: center;
        }

        .picture-artist {
          color: #7d7d7d;
          font-size: 15px;
          font-weight: regular;
          line-height: 19px;
        }
        .picture-year {
          width: 75%;
          height: 150px;
          margin-top: 10px;
          color: #f3f3f3;
          font-size: 200px;
          line-height: 150px;
          text-align: left;
        }
        .picture-description {
          width: 85%;
          margin-top: -40px;
          color: #7d7d7d;
          font-size: 14px;
          line-height: 28px;
          text-align: left;
        }
        .artist-image {
          position: absolute;
          left: 63%;
          top: 85%;
        }
        .overlay-button {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 152px;
          height: 40px;
          background-color: black;
          color: white;
          position: absolute;
          top: 70%;
          left: 1rem;
        }
        .overlay-button:hover {
          background-color: grey;
          opacity: 0.4;
          cursor: pointer;
        }
        a {
          text-decoration: none;
          color: #7d7d7d;
          font-size: 9px;
          font-weight: bold;
          position: absolute;
          top: 70%;
          left: 74%;
        }
        .current {
          opacity: 1;
          transform: translateX(0);
        }

        .slider .current {
          animation: move 10s infinite;
        }
        .arrow prev,
        .arrow next {
          color: #000000;
        }
        .arrow prev:hover .arrow next:hover {
          color: #7d7d7d;
        }
        .progress-bar-container {
          width: 100%;
          margin-top: 2rem;
        }
        .line-2 {
          border-top: 1px solid #e5e5e5;
          width: 85vw;
        }
        .line-3 {
          border-top: 1px solid #000000;
          position: absolute;
          width: 20px;
          transition: all;
        }

        .footer-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 5vh;
          justify-content: space-between;
          margin: 20px;
          padding: 20px;
        }
        .footer-name {
          font-size: 18px;
          font-weight: bold;
        }
        .footer-artist {
          font-size: 13px;
          font-weight: regular;
        }
        .button-container {
          width: 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .wrapper {
          max-width: 100vw;
          padding: 0 60px;
          margin: 50px auto;
          display: flex;
          flex-wrap: wrap;
          gap: 2em;
          opacity: 0.95;
        }
        .wrapper img {
          cursor: pointer;
        }

        /******media query **************/
        @media (min-width: 767px) and (max-width: 1200px) {
          .outer-container {
            width: 70vw;
            height: 70vh;
            margin: 1rem 1rem;
          }
          .slider-container {
            width: 70vw;
            height: 70vh;
          }
          .slide {
            width: 100%;
            height: 100%;
          }
          .image {
            max-width: 100%;
            min-width: 100%;
          }
          .container-one {
            width: 100%;
            height: 50%;
          }
          .container-two {
            width: 100%;
            height: 30%;
          }
          .details-one {
            position: relative;
            left: -15%;
          }
          .overlay-button {
            position: absolute;
            top: 85%;
            left: 5%;
          }
          .picture-year {
            width: 30%;
            height: 150px;
          }
          .artist-image {
            position: absolute;
            left: 105%;
            top: 80%;
          }
          a {
            position: absolute;
            top: 75%;
            left: 125%;
          }
          .line-2 {
            width: 100%;
          }
          .progress-bar-container {
            width: 100%;
            height: 2vh;
          }
          .footer-container {
            height: 2vh;
          }
          .button-container {
            width: 10%;
          }
          .wrapper {
            max-width: 90vw;
          }
        }
        @media (max-width: 767px) {
          .outer-container {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            margin: 1rem auto;
          }
          .slider-container {
            flex-direction: column;
            width: 100%;
            height: auto;
          }
          .slide {
            flex-direction: column;
            width: 100%;
          }
          .image {
            width: 100%;
            width: 100%;
            position: relative;
          }
          .artist-image {
            position: absolute;
            left: 1%;
            top: 42%;
          }

          .container-one {
            width: 100%;
          }
          .container-two {
            margin-top: 30%;
            width: 100%;
          }
          a {
            position: absolute;
            top: 100%;
            left: 1%;
          }
          .details-one {
            margin-top: -10%;
          }
          .overlay-button {
            position: absolute;
            top: 5%;
            left: 5%;
          }

          .progress-bar-container {
            height: 4vh;
          }
          .footer-container {
            height: 4vh;
          }
          .button-container {
            width: 20%;
          }
          .wrapper {
            max-width: 50vw;
          }
        }
      `}</style>
    </>
  );
}
