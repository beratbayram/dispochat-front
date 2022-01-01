import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";
import {getValueFromEvent} from "../../utils/utils";
import {Link} from "react-router-dom";

function JoinRoomModal() {
    const [roomInfo, setRoomInfo] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = getValueFromEvent(event, 'inputNickname');
        const roomId = getValueFromEvent(event, 'inputRoomId');
        try {
            const {response, fingerprint} = await Api.createChatter(nickName);
            const {message, messageResponseType} = response;
            if (message === 'Successfully Registered!') {
                const {message, messageResponseType} = await Api.joinRoom(nickName, fingerprint, roomId);
                setRoomInfo({nickName, message, roomId})
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (roomInfo?.message.match(/Your Join Request To Room "\d+" Has Been Sent to Owner of the Room/g))
        return (
            <form>
                <p> {roomInfo.message} </p>
            </form>
        )
    else if (roomInfo?.message.match(/Your Join Request Has Been Accepted/g)) //FIXME: fix matching
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
    else
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputNickname">Nick Name</label>
                <input id="inputNickname" name="inputNickname"/>
                <label htmlFor="inputRoomId">Room Id</label>
                <input id="inputRoomId" name="inputRoomId"/>
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