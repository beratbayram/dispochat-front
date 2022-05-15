import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import {toast} from "react-toastify";

const DEV_MODE = true;

export async function generateGeoIp() {
    if(DEV_MODE) return {
        ip: '111.22.33.444',
        country: 'Turkey',
        city: 'Ankara'
    }
    const {data} = await axios.get('http://ip-api.com/json')
    return {
        ip: data.query,
        country: data.country,
        city: data.city
    }
}

export const getFingerprintId = (() => {
    //Static variables in JS: http://chamnapchhorn.blogspot.com/2008/07/trick-to-use-static-variables-in.html
    const fingerprint = _generateFingerprintId();
    return () => fingerprint;
})();

async function _generateFingerprintId() {
    if(DEV_MODE) return (Math.random() * 1000000000).toFixed(5) + "-demo";
    const fp = await FingerprintJS.load({
        token: 'q8UcX00Wll9rl7vh0q3e'
    })
    const response = await fp.get(); //"olaVTN7KFP91KCrt8JRQ"
    return response.visitorId;
}

export function getValueFromEvent(event, id) {
    return event?.target?.elements?.[id]?.value
}

export async function toastifyPromise(func, successMsg, errorMsg, pendingMsg){
    return toast.promise(func,{
        pending: pendingMsg ?? "Loading...",
        success: {
            render(response){
                return (successMsg ?? "")
                    + (response?.data?.response?.message ?? "")
                    + (response?.data?.message ?? "")
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

export async function toastifyPromiseConfirm(func, Component, successMsg, errorMsg, pendingMsg){
    return toast.promise(func,{
        pending: pendingMsg ?? "Loading...",
        success: {
            render(response){
                return <Component msgData={response?.data ?? {} } closeToast={response.closeToast}/>;
            },
            theme: "colored",
            hideProgressBar: false,
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

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
