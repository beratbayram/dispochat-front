import axios from "axios";
import {generateFingerprintId, generateGeoIp} from "./utils";

export default class Api {
    static async createChatter(nickName) {
        const {country, city} = await generateGeoIp();
        const uniqueKey = await generateFingerprintId();
        const payload = {
            uniqueKey: uniqueKey,
            nickName: nickName,
            country: country,
            city: city
        };
        console.debug('createChatter payload:',payload);
        const {data:response} = await axios.post('http://localhost:8080/createChatter/', payload);
        return {response,uniqueKey};
    }

    static async createRoom(uniqueKey,) {
        console.debug('createRoom payload:',uniqueKey);
        const {data:response} = await axios.post('http://localhost:8080/createRoom/', uniqueKey);
        return response;
    }

    static async joinRoom(nickName,roomId){
        const payload = {
            uniqueKey: await generateFingerprintId(),
            nickName: nickName,
            roomId: roomId
        };
        console.debug('joinRoom payload:',payload);
        const {data} = await axios.post('http://localhost:8080/joinRoom/', payload);
        return data;
    }
}