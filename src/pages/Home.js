import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
function Home() {
  let navigate = useNavigate();
  const handleClick=()=>{
    navigate("/challenge")
  }
  useEffect(()=>{
    window.localStorage.clear()
  },[])
  return(
    <>
    <div className="home container">
      <h1 className="title">
        <div className="title-sec">60</div>
        <div className="title-challenge">
          <span>SECONDS</span>
          <span>CHALLENGE</span>
        </div>
      </h1>
      <div className="side">
        <button onClick={handleClick}>START!</button>
        <p>try to answer more as you can</p>
      </div>
    </div>
    </>
  )

}
export default Home;
