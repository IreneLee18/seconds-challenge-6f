import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Restart() {
  let navigate = useNavigate();
  const [score, setScore] = useState(0);
  const handleClick = () => {
    navigate("/");
  };
  useEffect(() => {
    setScore(window.localStorage.getItem("score"));
  }, []);
  return (
    <>
      <div className="restart container">
        <div>
          <h3>60 SECONDS CHALLENGE</h3>
        </div>
        <div>
          <h2>
            <span>—</span> YOUR FINAL SCORE <span>—</span>
          </h2>
          <h1>{score}</h1>
        </div>
        <button onClick={handleClick}>TRY AGAIN!</button>
      </div>
    </>
  );
}
export default Restart;
