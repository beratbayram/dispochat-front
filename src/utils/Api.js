import axios from "axios";
import {getFingerprintId, generateGeoIp} from "./utils";

export default class Api {
    static url = "http://localhost:8080/";
    static async createChatter(nickName) {
        const {country, city} = await generateGeoIp();
        const fingerprint = await getFingerprintId();
        const payload = {
            uniqueKey: fingerprint,
            nickName: nickName,
            country: country,
            city: city
        };
        console.debug('createChatter payload:', payload);
        const {data: response} = await axios.post(Api.url + 'createChatter/', payload);
        console.debug('createChatter response:', response)
        return {response, fingerprint};
    }

    static async createRoom(uniqueKey) {
        console.debug('createRoom payload:', uniqueKey);
        const {data: response} = await axios.post(Api.url + 'createRoom/', uniqueKey);
        console.debug('createRoom response:', response)
        return response;
    }

    static async joinRoom(nickName, fingerprint, roomId) {
        const payload = {
            uniqueKey: fingerprint,
            nickName: nickName,
            roomId: roomId
        };
        console.debug('joinRoom payload:', payload);
        const {data: response} = await axios.post(Api.url + 'joinRoom/', payload);
        console.debug('joinRoom response:', response)
        return response;
    }

    static async guestRequest(isAllowed){
        const payload = {
            uniqueKey: await getFingerprintId(),
            isAllowed
        };
        console.debug('guestRequest payload:', payload);
        const {data: response} = await axios.post(Api.url + 'guestRequest/' + isAllowed.toString(), payload.uniqueKey);
        console.debug('guestRequest response:', response);
        return response;
    }

    static async fetchRequester(){
        const uniqueKey = await getFingerprintId()
        console.debug('fetchRequester payload:', uniqueKey);
        const {data: response} = await axios.post(Api.url + 'fetchRequester/', uniqueKey);
        console.debug('fetchRequester response:', response);
        return response;
    }
}