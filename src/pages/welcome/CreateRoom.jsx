import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";
import {Link,Navigate} from "react-router-dom";
import {getValueFromEvent, toastifyPromise} from "../../utils/utils";
import 'react-toastify/dist/ReactToastify.css';

function CreateRoomModal() {
    const [roomInfo, setRoomInfo] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = getValueFromEvent(event,'nickName');
        const {response, fingerprint} = await toastifyPromise(Api.createChatter(nickName))
        const {/*message,*/ messageResponseType } = response;
        if (messageResponseType === 'SUCCESS') {
            const {message,/* messageResponseType*/ }  = await toastifyPromise(Api.createRoom(fingerprint));
            const roomId = parseInt(message.match(/\d+/)[0]) //TODO: This is error-prone
            setRoomInfo({nickName,message,roomId})
        }
    }

    if (roomInfo === null)
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="nickName">Nick Name</label>
                <input required autoFocus id="nickName" name="nickName"/>
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
                    <Navigate to={`/room?nickName=${roomInfo.nickName}&roomId=${roomInfo.roomId}`}/>
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