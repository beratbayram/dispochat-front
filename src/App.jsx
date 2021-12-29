import './App.sass';
// noinspection ES6CheckImport
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import Welcome from './pages/welcome/Welcome';
import bg from './assets/bg.svg';
import Test from './Test';
import Room from './pages/room/Room'

export default function App() {
    return (
        <BrowserRouter>
            <div id="site">
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/room" element={<Room/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
            <img src={bg} alt="background" id="background"/>
            <div id="modal"><></>
            </div>
        </BrowserRouter>
    )
}
