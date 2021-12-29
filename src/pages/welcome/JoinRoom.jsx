import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";

function JoinRoomModal() {
    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = event?.target?.elements?.inputNickname?.value
        const roomId = event?.target?.elements?.inputRoomId?.value
        try {
            console.log(await Api.createChatter(nickName));
            console.log(await Api.createRoom(nickName,roomId));
        } catch (error) {
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
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div id="JoinRoom">
            <button className="Welcome-button" onClick={() => setModalOpen(true)}>Join a Room </button>
            <Modal state={[isModalOpen,setModalOpen]} title="Join a Room">
                <JoinRoomModal/>
            </Modal>
        </div>
    )

}