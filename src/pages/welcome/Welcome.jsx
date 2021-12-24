import CreateRoom from './CreateRoom'
import JoinRoom from './JoinRoom'
import './Welcome.sass'
import logo from './../../assets/logo.svg';

export default function Welcome() {
    return (
        <div id="Welcome">
            <div id="Welcome-top">
                <img src={logo} alt="logo" />
                <h1><em>Dispo</em>Chat</h1>
            </div>
            <div id="Welcome-bottom">
                <CreateRoom />
                <JoinRoom />
            </div>
        </div >
    )
}