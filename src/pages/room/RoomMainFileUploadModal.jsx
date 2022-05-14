import Popup from 'reactjs-popup';

export default function RoomMainFileUploadModal({isOpen}) {


    return <>
        <Popup
            className="pop-up"
            open={isOpen}
            position="top center"

        >
            <input type="text"  placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <input type="text"  placeholder="E-Mail"/>
            <input type="text" placeholder="Name"/>
            <input type="text" placeholder="Surname"/>
            <input type="number" placeholder="SSN"/>
            <input type="text" placeholder="Profession"/>
        </Popup>
    </>
}