import './App.sass';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from './pages/welcome/Welcome';
import bg from './assets/bg.svg';
import Test from './Test';
import Modal from "./elements/Modal";

function Room() {
    return null;
}

function App() {
    return (
            <BrowserRouter>
                <div id="site">
                    <Routes>
                        <Route path="/" element={<Welcome/>}>
                            <Route path="modal" element={<Modal/>}/>
                            <Route path="test" element={<Test/>}/>
                            <Route path="room" element={<Welcome/>}>
                                <Route path=":roomId" element={<Room/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </div>
                <img src={bg} alt="background" id="background"/>
                <div id="modal"><></></div>
            </BrowserRouter>
    )
}

export default App;
