import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelActivity';

const Activities = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [card1, setCard1] = useState({});
    const [card2, setCard2] = useState({});
    const [total, setTotal] = useState(0);
    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
    let contA = 0;
    let contP = 0;
    let contT = 0;

    async function loadPage(page) {
        const response = (await axios.get('accounts/activity/?page=' + page, config)).data;
        response.results.forEach(request => {
            if (request.status === 'Aprobado') contA++;
            if (request.status === 'Pendiente') contP++;
            if (request.status === 'Terminado') contT++;
        });
        setTotal(response.count);
        setData(response.results);
        const card1 = {
            title: 'Recibidas',
            firstNumber: total,
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
    }
    useEffect(() => { loadPage(1); }, [])
    return (
        <MainPanel title='Actividades' card1={card1} card2={card2} data={data} loadPage={loadPage} total={total} />
    )
}
export default Activities