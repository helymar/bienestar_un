import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelRequest';

const Activities = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [card1, setCard1] = useState({});
    const [card2, setCard2] = useState({});

    const onLoad = async e => {
        const config = { 'headers': { 'Authorization': 'Bearer ' + auth.accessToken } }
        const response = (await axios.get('accounts/request/', config)).data;
        console.log(response);
        let contA = 0;
        let contP = 0;
        let contT = 0;
        response.forEach(request => {
            if (request.status == 'a') contA++;
            if (request.status == 'p') contP++;
            if (request.status == 't') contT++;
        });
        const card1 = {
            title: 'Recibidas',
            firstNumber: response.length,
            firstText: 'Solicitudes recibidas',
            secondNumber: contA,
            secondText: 'Aprobadas'
        }
        const card2 = {
            title: 'Solicitudes', 
            firstNumber: contP,
            firstText: 'Pendientes',
            secondNumber: contT,
            secondText: 'En Tramite'
        }
        setCard1(card1);
        setCard2(card2);
        setData(response);
    }
    useEffect(() => {
        onLoad();
    }, [])
    return (
        <MainPanel title='Actividades' card1={card1} card2={card2} data={data}  />
    )
}

export default Activities