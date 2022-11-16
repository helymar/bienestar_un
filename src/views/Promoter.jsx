import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import FormField from 'components/FormField/FormField';
const Promoter = () => {
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    const report = async (e) => {
        const config = { 'headers': { 'Authorization': 'Bearer ' + auth.accessToken } }
        e.preventDefault();
        const targets = e.target;
        try {
            const response = await axios.post('promoter/promoter/report/', config, 
                {
                    start_date: targets[0].value,
                    end_date: targets[1].value,
                    was_supervised: targets[2].value,
                    wake_up_calls: targets[3].value,
                    people_called: targets[4].value,
                    promoter_notes: targets[5].value,
                    zone: targets[6].value,

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
                <h3>Registro de horas</h3>
                <div className="row">
                    <img src={logo} alt='logo' width='48' />
                    <h2 className='thin'>Uninorte</h2>
                </div>
                <form onSubmit={report}>
                        <FormField key='start_date' label='start_date:' />
                        <FormField key='end_date' label='end_date' />
                        <FormField key='was_supervised' label='was_supervised' />
                        <FormField key='wake_up_calls' label='wake_up_calls:' />
                        <FormField key='people_called' label='people_called:' />
                        <FormField key='promoter_notes' label='promoter_notes:' />
                        <FormField key='zone' label='zone:' />
                        <input className='gradient-button' type="submit" value="Registrar" />
                    </form>
            </div>
        </section>
    )
}
export default Promoter