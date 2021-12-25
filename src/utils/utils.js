import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

export async function generateIP() {
    const response = await axios.get('https://api.ipify.org/?format=json')
    return response?.data?.ip;
}

export async function generateFingerprintId() {
    const fp = await FingerprintJS.load({
        token: 'q8UcX00Wll9rl7vh0q3e'
    })
    const response = await fp.get();
    return response.visitorId;

}
