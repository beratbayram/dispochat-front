import {Stomp} from "@stomp/stompjs";
import axios from "axios";
import {getFingerprintId} from "./utils";

export default class Socket {
    static url = "ws://localhost:8080"
    static fingerprint
    static stompClient;

    static connectToChat() {
        Socket.stompClient = Stomp.client(Socket.url + '/chat');
        Socket.stompClient.debug = console.debug
        Socket.stompClient.connect({}, async (frame) => {
            Socket.fingerprint = await getFingerprintId();
            const {
                id,
                unsubscribe
            } = Socket.stompClient.subscribe("/topic/messages/" + Socket.fingerprint, (message) => {
                console.log(JSON.parse(message.body))
            });
        });
        Socket.stompClient.activate();
    }

    static sendMsg(msg) {
        Socket.stompClient.send("/app/chat/" + Socket.fingerprint, {}, JSON.stringify({
            message: msg,
            senderUniqueKey: Socket.fingerprint
        }));
    }
}