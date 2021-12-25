import './App.sass';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PortalProvider} from "react-portal-hook";
import Welcome from './pages/welcome/Welcome';
import bg from './assets/bg.svg';
import Test from './Test';

function App() {
    return (
        <PortalProvider>
            <BrowserRouter>
                <div id="site">
                    <Routes>
                        <Route path="/" element={<Welcome/>}/>
                        <Route path="/test" element={<Test/>}/>
                    </Routes>
                </div>
                <img src={bg} alt="background" id="background"/>
            </BrowserRouter>
        </PortalProvider>
    )
}

export default App;
