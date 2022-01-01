import axios from "axios";
import {generateFingerprintId, generateGeoIp} from "./utils";

export default class Api {
    static async createChatter(nickName) {
        const {country, city} = await generateGeoIp();
        const fingerprint = await generateFingerprintId();
        const payload = {
            uniqueKey: fingerprint,
            nickName: nickName,
            country: country,
            city: city
        };
        console.debug('createChatter payload:',payload);
        const {data:response} = await axios.post('http://localhost:8080/createChatter/', payload);
        console.debug('createChatter response:', response)
        return {response,fingerprint};
    }

    static async createRoom(uniqueKey) {
        console.debug('createRoom payload:',uniqueKey);
        const {data:response} = await axios.post('http://localhost:8080/createRoom/', uniqueKey);
        console.debug('createRoom response:',response)
        return response;
    }

    static async joinRoom(nickName,fingerprint,roomId){
        const payload = {
            uniqueKey: fingerprint,
            nickName: nickName,
            roomId: roomId
        };
        console.debug('joinRoom payload:',payload);
        const {data:response} = await axios.post('http://localhost:8080/joinRoom/', payload);
        console.debug('joinRoom response:',response)
        return response;
    }
}