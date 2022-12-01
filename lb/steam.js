import axios from 'axios';
import React from 'react';

const Steam = () => {
    //fetching data from steam api
    // const [data, setData] = React.useState(null);
    // const [loading, setLoading] = React.useState(true);
    // const [error, setError] = React.useState(null);

    //using axios 
    axios.get('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=1EDC0D204A7716E809F0B2DABE207BE7&account_id=157748065')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    }
    )
    return (
        <h1> hola</h1>)
}


export default Steam;
