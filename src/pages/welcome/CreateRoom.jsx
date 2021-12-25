import {usePortals} from "react-portal-hook";
import Modal from "../../elements/Modal";
import axios from "axios";

function CreateRoomModal() {
    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = event?.target?.elements?.inputNickname?.value
        const uniqueKey = nickName.length;
        const payload = {
            uniqueKey: uniqueKey,
            nickName: nickName
        }
        try {
            const responseFromCreateChatter = await axios.post('http://localhost:8080/createChatter/', payload)
            const responseFromCreateRoom = await axios.post('http://localhost:8080/createRoom/', uniqueKey)
            console.log(responseFromCreateRoom)
        }catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputNickname">Nick Name</label>
            <input id="inputNickname" name="inputNickname"/>
            <button type="submit">Create</button>
        </form>
    )
}

export default function CreateRoom() {
    const {open: openPortal} = usePortals();

    return (
        <div id="CreateRoom">
            <button onClick={() =>
                openPortal(p => <Modal title="Create Room" closeModal={p.close}><CreateRoomModal/></Modal>)
            }>Create A Room
            </button>
        </div>
    )
}