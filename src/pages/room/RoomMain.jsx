import './RoomMain.sass';
import send from '../../assets/send.png'
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";
import Socket from "../../utils/Socket";
import {useEffect} from "react";

export default function RoomMain({nickName, roomId}) {

    useEffect(() => {
        Socket.connectToChat("resul");
    },[])
    const messages = [
        {
            isFromUser: true,
            msg: 'Hi',
            time: '11:35'
        },
        {
            isFromUser: false,
            msg: 'Hey 👋',
            time: '11:35'

        }
    ]

    function handleSubmit(event) {
        event.preventDefault();
        console.log(getValueFromEvent(event, 'inputBox'))
    }

    return (
        <main>
            <div id="messages-panel">
                <div id="message-container">
                    { //TODO: change index to an actual key
                        messages.map((elem, index) =>
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