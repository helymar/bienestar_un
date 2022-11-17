import React, { useEffect, useState } from 'react'
import { useContext } from 'react';

import logo from 'assets/logo.svg'
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import Input from 'components/Form/Input';


const Promoter = () => {
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
        <div style={{margin: '10px'}}>
            <section className='Promoter'>
                <div className="col">
                    <h3>Registro de horas</h3>
                    <form onSubmit={report}>
                        <Input key='start_date' label='start_date:' />
                        <Input key='end_date' label='end_date' />
                        <Input key='was_supervised' label='was_supervised' />
                        <Input key='wake_up_calls' label='wake_up_calls:' />
                        <Input key='people_called' label='people_called:' />
                        <Input key='promoter_notes' label='promoter_notes:' />
                        <Input key='zone' label='zone:' />
                            <input className='gradient-button' type="submit" value="Registrar" />
                        </form>
                </div>
            </section>
        </div>
       
    )
}
export default Promoter