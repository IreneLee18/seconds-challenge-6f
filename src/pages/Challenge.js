import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Challenge() {
  let navigate = useNavigate();
  const [time, setTime] = useState(60);
  const [answer, setAnswer] = useState("");
  const operation = ["+", "-", "×", "÷"];
  const digit = useRef(1);
  const first = useRef(0);
  const last = useRef(0);
  const operator = useRef("");
  const ans = useRef(0);
  const scoreStage = useRef(1);
  const [totalScore, setTotalScore] = useState(0);
  useEffect(() => {
    let timeId = setInterval(() => {
      setTime((prev) => prev - 1);
      if (time >= 41 && time <= 60) {
        scoreStage.current = 1;
        digit.current = 1;
      } else if (time >= 21 && time <= 40) {
        scoreStage.current = 1;
        digit.current = 2;
      } else if (time <= 20) {
        scoreStage.current = 5;
        digit.current = 3;
      }
    }, 1000);
    return () => {
      clearInterval(timeId);
      // timeId.current = null;
    };
  }, [setTime, time]);
  useEffect(() => {
    if (time === 0) {
      navigate("/restart");
      setTime(0);
      setTotalScore(0)
      window.localStorage.setItem('score',totalScore)
    }
  }, [navigate, time, totalScore]);
  const randomNum = (digits) => {
    //依據位數取出本次隨機數
    let maxNum = Math.pow(10, digits); //本次要用幾位數
    let minNum = Math.pow(10, digits - 1); //通過減去小一位數取得數字再加回，可以得到我們要的結果
    let num = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
    return num;
  };
  const getNumber = useCallback(() => {
    operator.current = operation[Math.floor(Math.random() * 4)];
    first.current = randomNum(digit.current); //先確定一個數字，主要是為了除法更為合理
    if (operator.current !== "÷") {
      last.current = randomNum(digit.current);
    } else {
      //主要是為了除法時，讓後數會等於前數的因數，減少難度並增加合理性
      let factor = [];
      for (let i = 1; i < first.current; i++) {
        if (first.current % i === 0) {
          factor.push(i);
        }
      }
      console.log(factor);
      last.current = factor[Math.floor((Math.random() * factor.length))];
    }

    switch (operator.current) {
      case "+":
        ans.current = first.current + last.current;
        break;
      case "-":
        ans.current = first.current - last.current;
        break;
      case "×":
        ans.current = first.current * last.current;
        break;
      case "÷":
        ans.current = first.current / last.current;
        break;
      default:
        new Error("error");
        break;
    }
    console.log(first.current, last.current, operator.current, ans);
  }, [digit, operation]);
  useEffect(() => {
    if (time === 60) {
      getNumber();
    }
  }, [getNumber, time]);
  const handleEnter = () => {
    if (answer === String(ans.current)) {
      setTotalScore((prev) => prev + scoreStage.current);
    } else {
      if (totalScore === 0) {
        setTotalScore(0);
      } else {
        setTotalScore((prev) => prev - 1);
      }
    }
    getNumber();
    setAnswer("");
  };
  return (
    <>
      <div className="challenge container">
        <div className="top">
          <div className="title">
            <p className="title-item">60 SECONDS CHALLENGE</p>
            <div className="title-score">
              <p>SCORE</p>
              {String(totalScore).length === 1 ? <p>00{totalScore}</p> : null}
              {String(totalScore).length === 2 ? <p>0{totalScore}</p> : null}
              {String(totalScore).length >= 3 ? <p>{totalScore}</p> : null}
            </div>
          </div>
          <div className="countdown">
            <h1>
              {time === 60 ? (
                <span>01:00</span>
              ) : (
                <span>00:{time < 10 ? `0${time}` : time}</span>
              )}
            </h1>
          </div>
        </div>
        <div className="calculator">
          <span>{first.current}</span>
          <span className="operation">{operator.current}</span>
          <span>{last.current}</span>
          <span className="operation">=</span>
          <input
            type="number"
            value={answer}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleEnter();
            }}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
export default Challenge;
