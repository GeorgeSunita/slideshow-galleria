export function Modal({ clickedImg, setClickedImg }) {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };
  return (
    <>
      <div className="overlay dismiss" onClick={handleClick}>
        <img src={clickedImg} alt="bigger picture" />
        <span className="button dismiss" onClick={handleClick}>
          CLOSE
        </span>
      </div>
      <style jsx>{`

      
        .overlay {
          position: fixed;
          top: 0;
          left:0;
          right: 0;
          width: 100vw;
          height: 66rem;
          background: black;
          margin: auto;
          display: flex;
          align-items: center;
          z-index:10;
        }

        .overlay img {
          display:block
          width:90%;
          margin: 60px auto;
        }

        .button{
          position:fixed;
          top:15%;
          left:72%;
          cursor:pointer;
          color:white;
        }
        @media (min-width: 767px) and (max-width: 1200px) {
          .overlay {
            width: 100vw;
            height:100vh;
        }
        .overlay img {
          display:block
          width:50%;
          margin: 30px auto;
        }
        .button{
          position:fixed;
          top:2%;
          left:75%;
    
      }
    }
    @media (max-width: 767px) {
      .overlay {   
        width: 100vw;
        height: 100vh;
    }
    .overlay img {
      width:50%;
      margin: 20px auto;
    }
    .button{  
      position:fixed;
      top:25%;
      left:60%;
  }
    }
        
      `}</style>
    </>
  );
}
