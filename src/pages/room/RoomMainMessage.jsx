import './RoomMainMessage.sass';
import {useNavigate} from "react-router-dom";

export default function RoomMainMessage({isFromUser, msg, time}) {
    const navigate = useNavigate();
    if(msg === '!?/kill') navigate('/');
    return (
        <div className={'RoomMainMessage ' + (isFromUser ? 'RoomMainMessage-user': null)}>
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