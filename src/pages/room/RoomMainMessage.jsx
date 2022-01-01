import './RoomMainMessage.sass';

export default function RoomMainMessage({isFromUser, msg, time}) {

    return (
        <div className={'RoomMainMessage ' + (isFromUser ? 'RoomMainMessage-user': null)}>
            <div
                className={'RoomMainMessageInner ' + (isFromUser ? 'RoomMainMessageInner-user' : 'RoomMainMessageInner-notUser')}>
                <p>{msg}</p>
            </div>
            <div className="HoverTip">
                <p>{time}</p>
            </div>
        </div>
    )
}