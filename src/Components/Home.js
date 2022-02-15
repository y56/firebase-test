import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('idToken');
        navigate('/login')
    }
    const sendRequest = () => {
        let idToken = sessionStorage.getItem('idToken');
        console.log(idToken);
        let headers = {
            'Authorization': 'Bearer ' + idToken,
            'Content-Type': 'application/json; UTF-8',
        }
        let url = 'https://us-central1-taipei-rioter.cloudfunctions.net/test-gcpcf-verify-token?id_token=';
        fetch(url + idToken, {
            method: 'GET',
            mode: 'cors',
            headers: headers})
            .then(response => response.json())
            .then(json => console.log(json));
        console.log('Dead End~!~!');
    }
    let navigate = useNavigate();
    useEffect(() => {
        let idToken = sessionStorage.getItem('idToken')
        console.log(idToken)
        if (idToken) {
            navigate('/home')
        }

        if (!idToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            Home Page

            <button onClick={handleLogout}>Log out</button>
            <button onClick={sendRequest}>Send request</button>
        </div>
    )
}
