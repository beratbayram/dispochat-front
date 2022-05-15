import './RoomMain.sass';
import uuid from 'react-uuid';
import send from '../../assets/send.png';
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";
import Socket from "../../utils/Socket";
import {useEffect, useRef, useState} from "react";
import RoomMainFileUpload from "../media/RoomMainFileUpload";
import RoomMainVoiceRecorder from "../media/RoomMainVoiceRecorder";

function handleSubmit(event) {
    event.preventDefault();
    const msg = getValueFromEvent(event, 'inputBox');
    if (msg.trim() === '') return;
    Socket.sendMsgToSocket('!?/text ' + msg);
    console.log(event.target)
    event.target[5].value = '';
}

export default function RoomMain({nickName, roomId}) {
    //msg: { isFromUser: Boolean,msg: string,time: string}
    const [msgArr, setMsgArr] = useState([]);
    const messagesEndRef = useRef(null);

    Socket.setMsgArr = setMsgArr;
    Socket.msgArr = msgArr

    useEffect(() => {
        Socket.connectToChat();
        return Socket.disconnect;
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
                    <div ref={messagesEndRef}/>
                    {/*Dummy div for auto-scroll*/}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <RoomMainFileUpload msgCallback={Socket.sendMsgToSocket}/>
                <RoomMainFileUpload msgCallback={Socket.sendMsgToSocket} image/>
                <RoomMainVoiceRecorder msgCallback={Socket.sendMsgToSocket}/>
                <input type="text" id="inputBox" name="inputBox" autoComplete="off"/>
                <button type="submit">
                    <img src={send} alt="send button"/>
                </button>
            </form>
        </main>
    )
}