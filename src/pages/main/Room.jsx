import './Room.sass';
import {Navigate, useSearchParams} from "react-router-dom";

export default function Room() {
    const [searchParams, /*setSearchParams*/] = useSearchParams();
    const nickName = searchParams.get('nickName');
    const roomId = searchParams.get('roomId');
    if (!nickName || !roomId) return <Navigate to="/"/>;

    return (
        <div id="Room">
            <p>{nickName + roomId}</p>
        </div>
    )
}