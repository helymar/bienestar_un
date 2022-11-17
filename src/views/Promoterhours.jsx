import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelPromoterhours';
import FormField from 'components/FormField';
import FormSelect from 'components/FormSelect';


const Promoterhours = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [zone, setzone] = useState({});
    const [card2, setCard2] = useState({});
    const [total, setTotal] = useState(0);
    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
    const [errMsg, setErrMsg] = useState('');
    const supervisado = [{id:'true', name:'Si'},{id:'false', name:'No'}];
    let contP = 0;
    let contT = 0;

    async function loadPage(page) {
        const response = (await axios.get('promoter/record/pending/?page=' + page, config)).data;
        setTotal(response.count);
        setData(response.data);
    }
    async function loadzones() {
        const response = (await axios.get('/promoter/zone/', config)).data;
        setzone(response);
    }

    const report = async (e) => {
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

    useEffect(() => { loadPage(1); loadzones(); }, [])
    return (
        <MainPanel title='Registro de Horas y horas pendientes' card1={<div className='col twice' style={{margin: '15px'}}>
        <div >
            <section className='Card'>
                <div className="col">
                    <h3>Registro de horas</h3>
                    <form onSubmit={report}>
                            <FormField key='start_date' label='Fecha de inicio:' type='datetime-local' />
                            <FormField key='end_date' label='Fecha de fin' type='datetime-local' />
                            <FormSelect key='was_supervised' label='Fue supervidado?' options={supervisado} />
                            
                            <FormField key='wake_up_calls' label='Numero de llamados de atención:' />
                            <FormField key='people_called' label='Total personas con llamados de atención:' />
                            <FormField key='promoter_notes' label='Notas:' />
                            <FormSelect key='zone' label='Zona:' options={zone}  />
                            <input className='gradient-button' type="submit" value="Registrar" />
                        </form>
                </div>
            </section>
        </div>
    </div>} data={data} loadPage={loadPage} total={total} />
    )
}
export default Promoterhours