import {Stomp} from "@stomp/stompjs";
import axios from "axios";
import {getFingerprintId} from "./utils";

export default class Socket {
    static url = "ws://localhost:8080"
    static fingerprint
    static stompClient;
    static selectedUser;

    static connectToChat() {
        Socket.stompClient = Stomp.client(Socket.url + '/chat');
        Socket.stompClient.debug = console.debug
        Socket.stompClient.connect({}, async (frame) => {
            Socket.fingerprint = await getFingerprintId();
            const {id,unsubscribe} = Socket.stompClient.subscribe("/topic/messages/" + Socket.fingerprint,console.log);
        });
        Socket.stompClient.activate();
    }

    static sendMsg(msg) {
        Socket.stompClient.send("/app/chat/" + Socket.fingerprint, {}, JSON.stringify({
            message: msg,
            senderUniqueKey: Socket.fingerprint
        }));
    }

    static selectUser(userName) {
        console.log("selecting users: " + userName);
        Socket.selectedUser = userName;
        console.log("selected user: " + Socket.selectedUser);
    }

    static async fetchAll() {
        console.log(await axios.get(Socket.url + "/fetchAllUsers"));
    }
}