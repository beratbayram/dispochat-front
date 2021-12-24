import './App.sass';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from './pages/welcome/Welcome';
import bg from './assets/bg.svg';
import Test from './Test';


function App() {
  return (
    <BrowserRouter>
      <div id="site">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
      <img src={bg} alt="background" id="background"/>
    </BrowserRouter>
  )
}
export default App;
