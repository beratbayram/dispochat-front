import Modal from "../../elements/Modal";
import Api from "../../utils/Api";
import {useState} from "react";
import {Link} from "react-router-dom";

function CreateRoomModal() {
    const [roomId, setRoomId] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const nickName = event?.target?.elements?.inputNickname?.value
        const {response, uniqueKey} = await Api.createChatter(nickName);
        console.debug('createChatter response:', response)
        if (response === 'Registered Successfully') {
            const response = await Api.createRoom(uniqueKey)
            console.debug('createRoom response:', response)
            setRoomId('Room ID: ' + response)
        }
    }

    if (roomId === "")
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputNickname">Nick Name</label>
                <input id="inputNickname" name="inputNickname"/>
                <button type="submit">Create</button>
            </form>
        )
    else
        return (
            <>
                <p>{roomId}</p>
                <Link to={'chat/' + roomId}>Invoices</Link>
            </>
        )
}

export default function CreateRoom() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div id="CreateRoom">
            <button className="Welcome-button" onClick={() => setModalOpen(true)}>Create a Room</button>
            <Modal state={[isModalOpen,setModalOpen]} title="Create a Room">
                <CreateRoomModal/>
            </Modal>
        </div>
    )
}