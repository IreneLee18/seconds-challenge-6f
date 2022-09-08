import{Routes,Route}from'react-router-dom'
import Home from './pages/Home'
import Challenge from './pages/Challenge'
import Restart from './pages/Restart'
function App(){
return(
  <>
  <Routes>
    <Route index element={<Home/>}/>
    <Route path="challenge" element={<Challenge/>}/>
    <Route path="restart" element={<Restart/>}/>
  </Routes>
  </>
)
}
export default App;