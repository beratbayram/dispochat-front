import './RoomMain.sass';
import send from '../../assets/send.png'
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";
import Socket from "../../utils/Socket";
import {useEffect, useState} from "react";

export default function RoomMain({nickName, roomId}) {
    //msg: { isFromUser: Boolean,msg: string,time: string}
    const [msgArr,setMsgArr] = useState([]);

    Socket.setMsgArr = setMsgArr;
    Socket.msgArr = msgArr
    useEffect(() => Socket.connectToChat(),[]);

    function handleSubmit(event) {
        event.preventDefault();
        const msg = getValueFromEvent(event, 'inputBox');
        Socket.sendMsgToSocket(msg);
        event.target[0].value ='';
    }

    return (
        <main>
            <div id="messages-panel">
                <div id="message-container">
                    { //TODO: change index to an actual key
                        msgArr.map((elem, index) =>
                            <RoomMainMessage key={index} isFromUser={elem.isFromUser} msg={elem.msg} time={elem.time}/>)
                    }
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="inputBox" name="inputBox"/>
                <button type="submit">
                    <img src={send} alt="send button"/>
                </button>
            </form>
        </main>
    )
}