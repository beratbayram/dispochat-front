import {Stomp} from "@stomp/stompjs";
import axios from "axios";

export default class Socket {
    static url = "ws://localhost:8080"
    static stompClient;
    static selectedUser;

    static connectToChat(uniqueKey) {
        Socket.stompClient = Stomp.client(Socket.url + '/chat');
        Socket.stompClient.debug = console.debug
        Socket.stompClient.connect({}, (frame) => {
            Socket.stompClient.subscribe("/topic/messages/" + uniqueKey, (response) => {
                let data = JSON.parse(response.body);
                console.log(data.message, data.fromLogin);
            });
        });
    }

    static sendMsg(from, text) {
        Socket.stompClient.send("/app/chat/" + Socket.selectedUser, {}, JSON.stringify({
            fromLogin: from,
            message: text
        }));
    }

    static async registration() {
        let userName = document.getElementById("userName").value;
        await axios.get(Socket.url + "/registration/" + userName, (response) => {
            Socket.connectToChat(userName);
        })
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