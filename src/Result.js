import React, { useEffect, useState } from "react";
import Colors from "./colors";
import CongratulationImage from "./images/cong.png"; // Add your congratulatory image path here
import FailureImage from "./images/fail.png"; // Add your failure image path here


function Result({ score, total }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
 
  useEffect(() => {
    if (score > 5) {
      setText("Congrats!");
      setImage(CongratulationImage);
    } else {
      setText("Sorry!");
      setImage(FailureImage);
    }
  }, [score]);

  return (
    <div
      className="flex flex-col gap-5 justify-center h-screen items-center"
      style={{
        backgroundColor: Colors.background,
        color: Colors.white,
      }}
    >
      <div
        className="flex flex-col items-center justify-center text-white p-10 rounded-lg text-center gap-5 w-[90%] sm:w-[60%] md:w-[60%] lg:w-[40%]"
        style={{ backgroundColor: Colors.backgroundDarker }}
      >
        {/* Image Rendering */}
        <img
          src={image}
          alt={text}
          className="w-[150px] h-[150px] object-cover mb-5"
        />
        
        <h2 className="text-[48px] font-semibold">{text}</h2>
        <p className="text-[32px]">
          Your score is {score} out of {total}.
        </p>

        <button
          className="rounded-md text-[24px] py-2 px-5 transition-all duration-300 ease-in-out"
          style={{ backgroundColor: Colors.buttonGreen }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = Colors.buttonGreenHover)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = Colors.buttonGreen)
          }
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}


export default Result;
