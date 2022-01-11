import './RoomAside.sass';
import logo from "../../assets/logo.svg";
import user from "../../assets/user.png";
import {toastifyPromise, toastifyPromiseConfirm} from "../../utils/utils";
import Api from "../../utils/Api";

function ToastifyButtons({msgData,closeToast}) {
    const {message,messageResponseType,chatter} = msgData;
    async function handleClick(isAccept){
        closeToast();
        await toastifyPromise(Api.guestRequest(isAccept));
    }

    if(!message.match(/wants to join to your room/g) || messageResponseType === 'ERROR') return message;
    return (
        <>
            <p>{message}</p>
            <br/>
            <p><em>{`(${chatter.country}/${chatter.city})`}</em></p>
            <button onClick={() => handleClick(true)} id="toast-button-accept">Accept</button>
            <button onClick={() => handleClick(false)} id="toast-button-reject">Reject</button>
        </>
    )
}

async function checkGuests(/*event*/) {
    await toastifyPromiseConfirm(Api.fetchRequester(),ToastifyButtons);
}

export default function RoomAside({nickName, roomId}) {

    return (
        <aside>
            <div id="aside-top">
                <img src={logo} alt="logo"/>
                <h1><em>Dispo</em>Chat</h1>
            </div>
            <div id="aside-middle">
                <h2>{`Connected to room ${roomId}`}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td><img src={user} alt="user-logo"/></td>
                        <td><img src={user} alt="user-logo"/></td>
                    </tr>
                    <tr id="nickNames">
                        <td><p>{nickName}</p></td>
                        <td><p>Berat</p></td>
                    </tr>
                    <tr>
                        <td><p>Ankara</p></td>
                        <td><p>Istanbul</p></td>
                    </tr>
                    <tr>
                        <td><p>Turkey</p></td>
                        <td><p>Turkey</p></td>
                    </tr>
                    </tbody>
                </table>
                <p>

                </p>
            </div>
            <div id="aside-bottom">
                <button onClick={checkGuests} type="button">
                    Check guests
                </button>
                <button type="button">
                    KILL SWITCH
                </button>
            </div>
        </aside>
    )
}