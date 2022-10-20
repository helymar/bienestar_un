import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelGroup';

const Groups = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [card1, setCard1] = useState({});
    let card2 = {
        title: 'Solicitando',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }

    const onLoad = async e => {
        const config = { 'headers': { 'Authorization': 'Bearer ' + auth.accessToken } }
        const response = (await axios.get('accounts/group/', config)).data;
        let cont = 0;
        response.forEach(group => {
            if (group.is_active) cont++;
        });

        const card1 = {
            title: 'Totales',
            firstNumber: response.length,
            firstText: 'Grupos registrados',
            secondNumber: cont,
            secondText: 'Grupos activos'
        }
        setCard1(card1);
        setData(response);
    }
    useEffect(() => {
        onLoad();
    }, [])

    return (
        <MainPanel title='Grupos' card1={card1} card2={card2} data={data} />
    )
}

export default Groups