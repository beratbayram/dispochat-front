import './RoomMainMessage.sass';

export default function RoomMainMessage({isFromUser, msg}) {

    return (
        <div className={'RoomMainMessage ' + (isFromUser ? 'RoomMainMessage-user' : 'RoomMainMessage-notUser')}>
            <div className={'RoomMainMessageInner '  + (isFromUser ? 'RoomMainMessageInner-user' : 'RoomMainMessageInner-notUser')}>
                    <p>{msg}</p>
            </div>
        </div>
    )
}