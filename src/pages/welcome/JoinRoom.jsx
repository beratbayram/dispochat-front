import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";
import {getValueFromEvent, toastifyPromise} from "../../utils/utils";
import {Link, Navigate} from "react-router-dom";

async function handleSubmit(event,setRoomInfo) {
    event.preventDefault();
    const nickName = getValueFromEvent(event, 'inputNickname');
    const roomId = getValueFromEvent(event, 'inputRoomId');
    try {
        const {response, fingerprint} = await toastifyPromise(Api.createChatter(nickName));
        const {/*message*/ messageResponseType} = response;
        if (messageResponseType === 'SUCCESS') {
            const {message, /*messageResponseType*/} = await toastifyPromise(Api.joinRoom(nickName, fingerprint, roomId));
            setRoomInfo({nickName, message, roomId})
        }
    } catch (error) {
        console.error(error)
    }
}

function JoinRoomModal() {
    const [roomInfo, setRoomInfo] = useState(null);
    if (roomInfo?.message.match(/Your join request to room \d+ has been sent to owner of the room/g)){

        return (
            <form>
                <p> {roomInfo.message} </p>
            </form>
        )
    }
    else if (roomInfo?.message.match(/Your Join Request Has Been Accepted/g)) //FIXME: fix matching
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
    else
        return (
            <form onSubmit={event => handleSubmit(event,setRoomInfo)}>
                <label htmlFor="inputNickname">Nickname</label>
                <input autoFocus required ="inputNickname" name="inputNickname"/>
                <label htmlFor="inputRoomId">Room Id</label>
                <input required type="number" min="1" id="inputRoomId" name="inputRoomId"/>
                <button type="submit">Join</button>
            </form>
        )
}

export default function JoinRoom() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div id="JoinRoom">
            <button className="Welcome-button" onClick={() => setModalOpen(true)}>Join a Room</button>
            <Modal state={[isModalOpen, setModalOpen]} title="Join a Room">
                <JoinRoomModal/>
            </Modal>
        </div>
    )

}