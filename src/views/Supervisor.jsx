import React, { useEffect, useState } from 'react'
import { useContext } from 'react';

import logo from 'assets/logo.svg'
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';

const Supervisor = () => {
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [zone, setzone] = useState({});
    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }

    async function loadzones() {
        const response = (await axios.get('/promoter/zone/', config)).data;
        setzone(response);
    }
    useEffect(() => {
        loadzones();
        // eslint-disable-next-line
    }, [])

    const report = async (e) => {
        e.preventDefault();
        const targets = e.target;
        try {
            const response = await axios.post('promoter/record/', config, 
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
        <div className='col twice' style={{margin: '15px'}}>
        <div >
            <section className='Card'>
                <div className="col">
                    <h3>Registro de horas</h3>
                    <form onSubmit={report}>
                            <Input key='start_date' label='Fecha de inicio:' type='datetime-local' />
                            <Input key='end_date' label='Fecha de fin' type='datetime-local'/>
                            <Input key='supervisor_wake_up_calls' label='llamados de atención' />
                            <Input key='supervisor_notes' label='Notas:' />
                            <Input key='promoter' label='Promotor:' />
                            <Select key='zone' label='Zona:' options={zone} />
                            <p>{errMsg}</p>
                            <input className='gradient-button' type="submit" value="Registrar" />
                    </form>
                </div>
            </section>
        </div>
    </div>
        
        
    )
}
export default Supervisor