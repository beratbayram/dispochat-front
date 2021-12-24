import {useState} from 'react';
import Modal from '../../elements/Modal';

export default function CreateRoom() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div id="CreateRoom">
            <button onClick={() => setIsModalOpen(!isModalOpen)}>Create A Room</button>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="Create Room">
                <p>Send nude pls</p>
            </Modal>
        </div >
    )
}