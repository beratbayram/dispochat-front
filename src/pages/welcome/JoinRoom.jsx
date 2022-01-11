import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";
import {getValueFromEvent, toastifyPromise} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

function JoinRoomModal() {
    const [roomInfo, setRoomInfo] = useState(null);
    const [isRefreshActive, setRefreshActive] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = getValueFromEvent(event, 'inputNickname');
        const roomId = getValueFromEvent(event, 'inputRoomId');
        try {
            const {response, fingerprint} = await toastifyPromise(Api.createChatter(nickName));
            const {/*message,*/ messageResponseType} = response;
            if (messageResponseType === 'SUCCESS') {
                const {message, messageResponseType} = await toastifyPromise(Api.joinRoom(nickName, fingerprint, roomId));
                setRoomInfo({nickName, message, roomId})
                setRefreshActive(true);
                if (messageResponseType === 'SUCCESS') {
                    setTimeout(async () => await handleRefresh(),3000)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRefresh(event) {
        event?.preventDefault();
        const {message, messageResponseType} = await toastifyPromise(Api.isAccepted());
        if(messageResponseType === 'SUCCESS') navigate(`/room?nickName=${roomInfo.nickName}&roomId=${roomInfo.roomId}`);
    }


    if (roomInfo === null)
        return (
            <form onSubmit={event => handleSubmit(event, setRoomInfo, setRefreshActive)}>
                <label htmlFor="inputNickname">Nickname</label>
                <input autoFocus required="inputNickname" name="inputNickname"/>
                <label htmlFor="inputRoomId">Room Id</label>
                <input required type="number" min="1" id="inputRoomId" name="inputRoomId"/>
                <button type="submit">Join</button>
            </form>
        )
    else
        return (
            <form>
                <p> {roomInfo.message} </p>
                {isRefreshActive ? <button onClick={handleRefresh}>Check Again</button> : null}
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