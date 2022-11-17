import React, { useEffect, useState } from 'react'
import { useContext } from 'react';

import logo from 'assets/logo.svg'
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import FormField from 'components/FormField';


const Supervisor = () => {
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    const report = async (e) => {
        const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
        e.preventDefault();
        const targets = e.target;
        try {
            const response = await axios.post('promoter/supervisor/report/', config, 
                {
                    start_date: targets[0].value,
                    end_date: targets[1].value,
                    supervisor_wake_up_calls: targets[2].value,
                    supervisor_notes: targets[3].value,
                    promoter: targets[4].value,
                    zone: targets[5].value,

                }
            )
            console.log(response);
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing data');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Report Failed');
            }
        }
    }
    return (
        <section className='Promoter'>
            <div className="col">
                <h3>Reporte de horas supervisor</h3>
                <div className="row">
                    <img src={logo} alt='logo' width='48' />
                    <h2 className='thin'>Uninorte</h2>
                </div>
                <form onSubmit={report}>
                        <FormField key='start_date' label='start_date:' />
                        <FormField key='end_date' label='end_date' />
                        <FormField key='supervisor_wake_up_calls' label='supervisor_wake_up_calls' />
                        <FormField key='supervisor_notes' label='supervisor_notes:' />
                        <FormField key='promoter' label='promoter:' />
                        <FormField key='zone' label='zone:' />
                        <input className='gradient-button' type="submit" value="Registrar" />
                    </form>
            </div>
        </section>
    )
}
export default Supervisor