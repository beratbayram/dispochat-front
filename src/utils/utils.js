import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

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
