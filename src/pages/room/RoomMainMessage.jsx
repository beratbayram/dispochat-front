import './RoomMainMessage.sass';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";

export default function RoomMainMessage({isFromUser, msg, time}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (msg === '!?/kill'){
            navigate('/');
            toast.success("The Room is killed by the peer!");
        }
    })
    return (
        <div className={'RoomMainMessage ' + (isFromUser ? 'RoomMainMessage-user' : null)}>
            <div
                className={'RoomMainMessageInner ' + (isFromUser ? 'RoomMainMessageInner-user' : 'RoomMainMessageInner-notUser')}>
                <p>{msg}</p>
            </div>
            <div className="HoverTip">
                <p>{time}</p>
            </div>
        </div>
    )
}