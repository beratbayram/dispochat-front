import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import {toast} from "react-toastify";
import Api from "./Api";

export async function generateGeoIp() {
    return {
        ip: '111.22.33.444',
        country: 'Atlantis',
        city: 'Angara'
    }
    const {data} = await axios.get('http://ip-api.com/json')
    return {
        ip: data.query,
        country: data.country,
        city: data.city
    }
}

export async function generateFingerprintId() {
    return (Math.random() * 1000000000).toFixed(5) + "-demo";
    const fp = await FingerprintJS.load({
        token: 'q8UcX00Wll9rl7vh0q3e'
    })
    const response = await fp.get(); //"olaVTN7KFP91KCrt8JRQ"
    return response.visitorId;
}

export function getValueFromEvent(event, id) {
    return event?.target?.elements?.[id]?.value
}

export async function toastifyPromise(func, pendingMsg, successMsg, errorMsg){
    return toast.promise(func,{
        pending: pendingMsg ?? "Loading...",
        success: {
            render(response){
                console.log(response)
                return (successMsg ?? "") + response?.data?.response?.message;
            },
            theme: "colored",
            hideProgressBar: false
        },
        error: {
            render(err){
                return (errorMsg ?? "") + err?.data?.message
            },
            theme: "colored",
            hideProgressBar: false
        },
    })
}
