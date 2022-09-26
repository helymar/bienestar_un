import React from 'react'

import MainPanel from 'components/MainPanel/MainPanel';

const Dashboard = () => {
    const card1 = {
        title: 'Administrativos',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }
    const card2 = {
        title: 'Estudiantes',
        firstNumber: 24,
        firstText: 'usuarios registrados',
        secondNumber: 10,
        secondText: 'activos en los últimos 7 días'
    }
    return (
        <MainPanel title='Dashboard' card1={card1} card2={card2} />
    )
}

export default Dashboard