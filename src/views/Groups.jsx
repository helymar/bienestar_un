import React from 'react'

import MainPanel from 'components/MainPanel/MainPanel';

const Groups = () => {
    const card1 = {
        title: 'Totales',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }
    const card2 = {
        title: 'Solicitando',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }
    return (
        <MainPanel title='Grupos' card1={card1} card2={card2} />
    )
}

export default Groups