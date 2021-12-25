import {useState} from 'react';
import {usePortals} from "react-portal-hook";

function Modal({title, children, closeModal}) {
    return (
        <div id="modal">
            <header>
                <h2>{title}</h2>
                <button type="button" onClick={closeModal}>X</button>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default function CreateRoom() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const portalManager = usePortals();

    return (
        <div id="CreateRoom">
            <button onClick={() =>
                portalManager.open(portal => <Modal title="Hello" closeModal={portal.close}>Q</Modal>)
            }>Create A Room
            </button>
        </div>
    )
}