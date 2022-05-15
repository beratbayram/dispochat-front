import './RoomMainMessage.sass';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import RoomMainOtherFiles from "../media/RoomMainOtherFiles";

export default function RoomMainMessage({isFromUser, msg, time}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (msg === '!?/kill') {
            navigate('/');
            toast.warn("The Room is killed by the peer!");
        }
    })
    const msgComponent = <MessageInner message={msg}/>;
    if (msgComponent.props.message === "!?/audio") return null;
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
    const wordArr = message.split(' ')
    wordArr.shift();
    const [msgCode, msgContent, filename, filesize] = message.split(' ');

    if (msgCode === '!?/text') return <p>{wordArr.join(' ')}</p>

    const fileAddress = sessionStorage.getItem(msgContent) ?? msgContent;
    sessionStorage.setItem(msgContent, fileAddress);

    const msgCodeArr = msgCode.split("/");

    if (!msgContent) return null;
    switch (msgCodeArr[1]) {
        case 'image':
            return (
                <img onContextMenu={e => e.preventDefault()} //prevents right-click to context menu
                     src={fileAddress}
                     alt="img"/>
            )
        case 'audio':
            return (
                <audio crossOrigin="anonymous" controls>
                    <source src={fileAddress} type={"audio/" + msgCodeArr[2]}/>
                </audio>
            )
        case 'video':
            return (
                <video crossOrigin="anonymous" controls width="300px">
                    <source src={fileAddress} type={"video/" + msgCodeArr[2]}/>
                    Sorry, your browser doesn't support embedded videos.
                </video>
            )
        default:
            return <RoomMainOtherFiles src={fileAddress} filename={filename} size={filesize}/>
    }
}