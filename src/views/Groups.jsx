import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelGroup';

const Groups = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [card1, setCard1] = useState({});
    const [total, setTotal] = useState(0);

    
    let card2 = {
        title: 'Solicitando',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }

    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }


    async function loadPage(page) {
        const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
        const response = (await axios.get('accounts/?page=' + page+'&role=grupo', config)).data;
        let cont = 0;


        const card1 = {
            title: 'Totales',
            firstNumber: response.count,
            firstText: 'Grupos registrados',
            secondNumber: cont,
            secondText: 'Grupos activos'
        }
        setCard1(card1);
        setTotal(response.count);
        setData(response.results);
    }
    useEffect(() => { loadPage(1); }, [])
    return (
        <MainPanel title='Grupos' card1={card1} card2={card2} data={data}  loadPage={loadPage} total={total}/>
    )
}

export default Groups