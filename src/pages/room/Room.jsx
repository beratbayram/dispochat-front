import {Navigate, useSearchParams} from "react-router-dom";
import RoomAside from "./RoomAside";
import RoomMain from "./RoomMain";

import  './Room.sass'

export default function Room() {
    const [searchParams, /*setSearchParams*/] = useSearchParams();
    const nickName = searchParams.get('nickName');
    const roomId = searchParams.get('roomId');
    const isOwner = searchParams.get('isOwner');
    if (!nickName || !roomId) return <Navigate to="/"/>;

    return (
        <div id="Room">
            <RoomAside nickName={nickName} roomId={roomId} isOwner={isOwner}/>
            <RoomMain nickName={nickName} roomId={roomId} isOwner={isOwner}/>
        </div>
    )
}