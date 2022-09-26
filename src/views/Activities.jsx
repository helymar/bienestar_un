import React from 'react'

import MainPanel from 'components/MainPanel/MainPanel';

const Activities = () => {
    const card1 = {
        title: 'Realizadas',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }
    const card2 = {
        title: 'Próximas',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }
    return (
        <MainPanel title='Actividades' card1={card1} card2={card2} />
    )
}

export default Activities