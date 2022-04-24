import './RoomMain.sass';
import send from '../../assets/send.png'
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";
import Socket from "../../utils/Socket";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";

function handleSubmit(event) {
    event.preventDefault();
    const msg = getValueFromEvent(event, 'inputBox');
    console.log(msg)
    if (msg.trim() === '') {
        toast.warn("Please enter a message");
        return;
    }
    Socket.sendMsgToSocket(msg);
    event.target[0].value = '';
}

export default function RoomMain({nickName, roomId}) {
    //msg: { isFromUser: Boolean,msg: string,time: string}
    const [msgArr, setMsgArr] = useState([]);
    const messagesEndRef = useRef(null);

    Socket.setMsgArr = setMsgArr;
    Socket.msgArr = msgArr

    useEffect(() => {
        Socket.connectToChat()
    }, []);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [msgArr]);

    return (
        <main>
            <div id="messages-panel">
                <div id="message-container">
                    <div style={{height:"5000px"}}>
                    </div>
                    { //TODO: change index to an actual key
                        msgArr.map((elem, index) => <RoomMainMessage key={index}
                                                                     isFromUser={elem.isFromUser}
                                                                     msg={elem.msg}
                                                                     time={elem.time}/>)
                    }
                    <div ref={messagesEndRef}/>
                    {/*Dummy div for auto-scroll*/}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="inputBox" name="inputBox" autoComplete="off"/>
                <button type="submit">
                    <img src={send} alt="send button"/>
                </button>
            </form>
        </main>
    )
}