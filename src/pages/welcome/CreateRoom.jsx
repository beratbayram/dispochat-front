import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";
import {Link} from "react-router-dom";
import {getValueFromEvent} from "../../utils/utils";

function CreateRoomModal() {
    const [roomInfo, setRoomInfo] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = getValueFromEvent(event,'nickName');
        const {response, fingerprint} = await Api.createChatter(nickName);
        const {message, messageResponseType } = response;
        if (message === 'Successfully Registered!') {
            const {message, messageResponseType }  = await Api.createRoom(fingerprint)
            const roomId = message.match(/\d+/)[0] //TODO: This is error-prone
            setRoomInfo({nickName,message,roomId})
        }
    }

    if (roomInfo === null)
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="nickName">Nick Name</label>
                <input id="nickName" name="nickName"/>
                <button type="submit">Create</button>
            </form>
        )
    else
        return (
            <form>
                <p>{roomInfo.message}</p>
                <button type="button">
                    <Link to={`/room?nickName=${roomInfo.nickName}&roomId=${roomInfo.roomId}`}>
                        Go to the Room
                    </Link>
                </button>
            </form>
        )
}

export default function CreateRoom() {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <div id="CreateRoom">
            <button className="Welcome-button" onClick={() => setModalOpen(true)}>Create a Room</button>
            <Modal state={[isModalOpen, setModalOpen]} title="Create a Room">
                <CreateRoomModal/>
            </Modal>
        </div>
    )
}