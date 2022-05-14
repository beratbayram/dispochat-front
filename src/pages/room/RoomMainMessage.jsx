import './RoomMainMessage.sass';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";

export default function RoomMainMessage({isFromUser, msg, time}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (msg === '!?/kill') {
            navigate('/');
            toast.warn("The Room is killed by the peer!");
        }
    })
    return (
        <div className={'RoomMainMessage ' + (isFromUser ? 'RoomMainMessage-user' : '')}>
            <div
                className={'RoomMainMessageInner ' + (isFromUser ? 'RoomMainMessageInner-user' : 'RoomMainMessageInner-notUser')}>
                <MessageInner message={msg}/>
            </div>
            <div className="HoverTip">
                <p>{time}</p>
            </div>
        </div>
    )
}

function MessageInner({message}) {
    const [msgCode, msgContent] = message.split(' ');
    console.log(msgCode);
    if (msgCode === '!?/img'){
        const imgAddress = localStorage.getItem(msgContent) ?? msgContent;

        return (
            <a href={msgContent} download target='_blank' rel="noreferrer">
                <img src={imgAddress} alt="img"/>
            </a>
        )
    }
    else
        return <p>{message}</p>
}