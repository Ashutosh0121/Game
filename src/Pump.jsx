import React, { useEffect, useState } from "react";
import "./Pump.css";

export default function Pump() {
  const [pumpCount, setPumpCount] = useState(0);
  const [alphaCount, setAlphCount] = useState(0);
  const [ballonCount, setBallonCount] = useState(0);
  const [game, setGame] = useState([]);

  const Alphabet = [
    "Symbol 10001.png", "Symbol 10002.png", "Symbol 10003.png", "Symbol 10004.png", "Symbol 10005.png",
    "Symbol 10006.png", "Symbol 10007.png", "Symbol 10008.png", "Symbol 10009.png", "Symbol 10010.png",
    "Symbol 10011.png", "Symbol 10012.png", "Symbol 10013.png", "Symbol 10014.png", "Symbol 10015.png",
    "Symbol 10016.png", "Symbol 10017.png", "Symbol 10018.png", "Symbol 10019.png", "Symbol 10020.png",
    "Symbol 10021.png", "Symbol 10022.png", "Symbol 10023.png", "Symbol 10024.png", "Symbol 10025.png", "Symbol 10026.png"
  ];

  const ballon = [
    "Symbol 100001.png", "Symbol 100002.png", "Symbol 100003.png", "Symbol 100004.png", "Symbol 100005.png",
    "Symbol 100006.png", "Symbol 100007.png", "Symbol 100008.png", "Symbol 100009.png"
  ];

  useEffect(() => {
    const Ballon_C = document.querySelector(".ballon-container");
    if (Ballon_C) {
      switch (pumpCount) {
        case 0:
          Ballon_C.style.transition = "none";
          Ballon_C.style.transform = "scale(0.0) translateY(30rem)";
          break;
        case 1:
          Ballon_C.style.transition = "none";
          Ballon_C.style.transform = "scale(0.2) translatey(20rem)";
          break;
        case 2:
          Ballon_C.style.transition = "transform 1s ease-in-out";
          Ballon_C.style.transform = "scale(0.5) translatey(7rem)";
          break;
        case 3:
          Ballon_C.style.transition = "transform 1s ease-in-out";
          Ballon_C.style.transform = "scale(1)";
          break;
        default:
          break;
      }
    }
  }, [pumpCount]);

  const Pump = () => {
    setPumpCount((prev) => {
      const nextCount = prev + 1;

      if (nextCount > 3) {
        const newId = Date.now();
        setAlphCount((prevAlpha) => {
          const newAlpha = prevAlpha >= 25 ? 0 : prevAlpha + 1;
          return newAlpha;
        });
        setBallonCount((prevBallon) => {
          const newBallon = prevBallon >= 8 ? 0 : prevBallon + 1;
          return newBallon;
        });

        setGame((prevGame) => [
          ...prevGame,
          {
            id: newId,
            alphaIndex: alphaCount,
            ballonIndex: ballonCount,
          },
        ]);

        return 1;
      }

      return nextCount;
    });

    // Pump animation
    const pump = document.getElementById("pump");
    pump.style.transition = "transform 0.3s ease";
    pump.style.transform = "scale(1,0.9)";
    setTimeout(() => {
      pump.style.transform = "scale(1)";
    }, 300);

    const handle = document.getElementById("handle");
    handle.style.transition = "transform 0.3s ease";
    handle.style.transform = "translateY(7rem)";
    setTimeout(() => {
      handle.style.transform = "translateY(0)";
    }, 300);

    const outlet = document.getElementById("outlet");
    outlet.style.transition = "transform 0.3s ease";
    outlet.style.transform = "translateY(0.7rem)";
    setTimeout(() => {
      outlet.style.transform = "translateY(0)";
    }, 300);
  };

  const pop = (clickedId) => {
    setGame((prevGame) => prevGame.filter((item) => item.id !== clickedId));
    const audio = new Audio("./public/pop.mp3");
    audio.play();
  };

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const balloons = document.querySelectorAll(".move");
      balloons.forEach((balloon) => {
        const newBottom = Math.random() * 90;
        const newRight = Math.random() * 90;
        balloon.style.bottom = `${newBottom}vh`;
        balloon.style.right = `${newRight}vw`;
      });
    }, 700);

    return () => clearInterval(moveInterval);
  }, [game]);


  
  return (
    <>
    
    {game.map((item) => (
      <div key={item.id} className="move" onClick={() => pop(item.id) }>
        <img
          id="ballon"
          src={`${import.meta.env.BASE_URL}assets/${ballon[item.ballonIndex]}`}
          alt="Ballon"
        />
        <img
          id="alphabet"
          src={`${import.meta.env.BASE_URL}assets/${Alphabet[item.alphaIndex]}`}
          alt="Alphabet"
        />
        <img
          src={`${import.meta.env.BASE_URL}assets/Symbol 100011.png`}
          className="tail"
          alt="Tail"
        />
      </div>
    ))}
  
    <div className="ballon-container">
      <img
        id="ballon"
        src={`${import.meta.env.BASE_URL}assets/${ballon[ballonCount]}`}
        alt="Ballon"
      />
      <img
        id="alphabet"
        src={`${import.meta.env.BASE_URL}assets/${Alphabet[alphaCount]}`}
        alt="Alphabet"
      />
    </div>
  
    <div className="pump-container">
      <img  id="handle" onClick={Pump} src={`${import.meta.env.BASE_URL}assets/Symbol 320001.png`} alt="Handle" />
      <img id="outlet"src={`${import.meta.env.BASE_URL}assets/Symbol 320002.png`} alt="Outlet"/>
      <div className="pump">
        <img id="pump" src={`${import.meta.env.BASE_URL}assets/Symbol 320003.png`} alt="Pump" />
      </div>
    </div>
  </>
  );
}
