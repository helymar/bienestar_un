import { React, useContext } from 'react';

import axios from 'context/axios'
import AuthContext from 'context/AuthProvider';
import MainPanel from 'components/MainPanel/MainPanelSentings';

const Settings = () => {
    const { setAuth } = useContext(AuthContext);

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
    const { auth } = useContext(AuthContext);
    const logout = async (e) => {
        await axios.post('accounts/auth/logout/', {}, { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }).catch(err => console.log(err));
        setAuth({});
        localStorage.removeItem('user');
    };
    const rightContent =
        <div>
            <h2>Hola {auth.user}!</h2>
            <button className='gradient-button' onClick={logout}>Cerrar sesión</button>
        </div>
    return (
        <MainPanel title='Ajustes' rightContent={rightContent} />
    )
}

export default Settings