import {usePortals} from "react-portal-hook";
import Modal from "../../elements/Modal";

export default function CreateRoom() {
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