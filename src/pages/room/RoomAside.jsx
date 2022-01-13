import './RoomAside.sass';
import logo from "../../assets/logo.svg";
import user from "../../assets/user.png";
import {toastifyPromise, toastifyPromiseConfirm} from "../../utils/utils";
import Api from "../../utils/Api";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

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
    const navigate = useNavigate();
    const [chatters,setChatters] = useState(null)
    const {guestChatter,ownerChatter} = chatters ?? {};

    useEffect(() => { Api.queryChatters(roomId).then(setChatters)},[roomId]);


    async function handleKillSwitch() {
        // FIXME
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are u sure you want to kill this room?"))
        {
            const {message,messageResponseType} = await toastifyPromise(Api.killSwitch());
            if(messageResponseType === 'SUCCESS') navigate('/');
        }
    }

    return (
        <aside>
            <div id="aside-top">
                <img src={logo} onClick={handleKillSwitch} alt="logo"/>
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
                        <td><p>{ownerChatter?.nickName}</p></td>
                        <td><p>{guestChatter?.nickName ?? "Empty"}</p></td>
                    </tr>
                    <tr>
                        <td><p>{ownerChatter?.city}</p></td>
                        <td><p>{guestChatter?.city}</p></td>
                    </tr>
                    <tr>
                        <td><p>{ownerChatter?.country}</p></td>
                        <td><p>{guestChatter?.country}</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="aside-bottom">
                <button onClick={checkGuests} type="button">
                    Check guests
                </button>
                <button onClick={handleKillSwitch} type="button">
                    KILL SWITCH
                </button>
            </div>
        </aside>
    )
}