import axios from 'axios';
import {useState,useEffect} from 'react';

export default function Test() {
    const [result, setResult] = useState("bekle aq");

    useEffect(() => {
        const payload = {
            uniqueKey: "3131",
            nickName: "Nude",
            city: "Angara",
            country: "Atlantis"
        }
        axios.post('http://25.74.27.41:8080/createChatter/', payload)
            .then(res => setResult(res.data))
            .catch(res => setResult(res.toString()));
    }, [])

    return (
        <div>
            <p>{result}</p>
        </div>
    )
}
