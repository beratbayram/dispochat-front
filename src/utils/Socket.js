import {Stomp} from "@stomp/stompjs";
import url from "../assets/url";
import {getFingerprintId} from "./utils";

export default class Socket {
    static url = "ws://" + url;
    static fingerprint
    static stompClient;

    static msgArr;
    static setMsgArr;

    static connectToChat() {
        Socket.stompClient = Stomp.client(Socket.url + '/chat');
        Socket.stompClient.debug = console.debug
        Socket.stompClient.connect({}, async (frame) => {
            Socket.fingerprint = await getFingerprintId();
            Socket.stompClient.subscribe("/topic/messages/" + Socket.fingerprint, (response) => {
                console.debug("Received message:", response.body)
                Socket.sendMsgToScreen(false, response.body);
            });
        });
        Socket.stompClient.activate();
    }

    static sendMsgToSocket(msg) {
        Socket.stompClient.send("/app/chat/" + Socket.fingerprint, {}, JSON.stringify({
            message: msg,
            senderUniqueKey: Socket.fingerprint
        }));
        Socket.sendMsgToScreen(true, msg);
    }

    static sendMsgToScreen(isFromUser, msg) {
        const date = new Date();
        let minutes = date.getMinutes();
        if(minutes < 10) minutes = `0${minutes}`;
        const time = `${date.getHours()}:${minutes}`;
        const message = {
            isFromUser,
            msg,
            time
        }
        Socket.setMsgArr([...Socket.msgArr, message])
    }
}