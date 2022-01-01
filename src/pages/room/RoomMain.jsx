import './RoomMain.sass';
import send from '../../assets/send.png'
import {getValueFromEvent} from "../../utils/utils";
import RoomMainMessage from "./RoomMainMessage";

export default function RoomMain() {
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

        },
        {
            isFromUser: true,
            msg: 'I am sending the private key right now. Please keep it to yourself.',
            time: '11:36'
        },
        {
            isFromUser: true,
            msg: 'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGewOB1rGsUll1yYYAkTzM/LGrJp=',
            time: '11:37'
        },
        {
            isFromUser: false,
            msg: 'Definitely. No worries 👍',
            time: '11:37'
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