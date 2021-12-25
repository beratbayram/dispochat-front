import {usePortals} from "react-portal-hook";
import Modal from "../../elements/Modal";
import axios from "axios";
import generateUniqueKey from "../../utils/utils";

function JoinRoomModal() {
    generateUniqueKey();
    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = event?.target?.elements?.inputNickname?.value
        const roomId = event?.target?.elements?.inputRoomId?.value
        const uniqueKey = nickName.length;
        const payload = {
            uniqueKey: uniqueKey,
            nickName: nickName
        }
        const payload2 = {
            uniqueKey: uniqueKey,
            roomId: roomId
        }

        try {
            const responseFromCreateChatter = await axios.post('http://localhost:8080/createChatter/', payload)
            const responseFromJoinRoom = await axios.post('http://localhost:8080/joinRoom/', payload2)
            console.log(responseFromJoinRoom)
        }catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputNickname">Nick Name</label>
            <input id="inputNickname" name="inputNickname"/>
            <label htmlFor="inputRoomId">Room Id</label>
            <input id="inputRoomId" name="inputRoomId"/>
            <button type="submit">Create</button>
        </form>
    )
}

export default function JoinRoom() {
    const {open: openPortal} = usePortals();
    return (
        <div id="JoinRoom">
            <button onClick={() =>
                openPortal(p => <Modal title="Join Room" closeModal={p.close}><JoinRoomModal/></Modal>)
            }>Join A Room
            </button>
        </div>
    )

}