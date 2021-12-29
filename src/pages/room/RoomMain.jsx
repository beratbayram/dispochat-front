import './RoomMain.sass';
import send from '../../assets/send.png'
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";

export default function RoomMain() {
    const messages = [
        {
            isFromUser: true,
            msg: 'Merhaba'
        },
        {
            isFromUser: false,
            msg: 'Merhaba'
        },
        {
            isFromUser: true,
            msg: 'Şu çok gizli işi konuşalım mı?'
        },
        {
            isFromUser: false,
            msg: 'Tamam başlayalım'
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
                            <RoomMainMessage key={index} isFromUser={elem.isFromUser} msg={elem.msg}/>)
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