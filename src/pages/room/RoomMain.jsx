import './RoomMain.sass';
import uuid from 'react-uuid';
import send from '../../assets/send.png';
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";
import Socket from "../../utils/Socket";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import RoomMainFileUpload from "./RoomMainFileUpload";

function handleSubmit(event) {
    event.preventDefault();
    const msg = getValueFromEvent(event, 'inputBox');
    if (msg.trim() === '') {
        toast.warn("Please enter a message");
        return;
    }
    Socket.sendMsgToSocket(msg);
    event.target[2].value = '';
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
                    { //TODO: change index to an actual key
                        msgArr.map(elem => <RoomMainMessage key={uuid()}
                                                            isFromUser={elem.isFromUser}
                                                            msg={elem.msg}
                                                            time={elem.time}/>)
                    }
                <div ref={messagesEndRef}/> {/*Dummy div for auto-scroll*/}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <RoomMainFileUpload msgCallback={Socket.sendMsgToSocket}/>
                <input type="text" id="inputBox" name="inputBox" autoComplete="off"/>
                <button type="submit">
                    <img src={send} alt="send button"/>
                </button>
            </form>
        </main>
    )
}