import React, { useEffect, useState } from 'react'

import { useContext } from 'react';
import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelPromoterhours';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';


const Promoterhours = () => {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [supervisor, setsupervisor] = useState([]);
    const [zone, setzone] = useState({});
    const [total, setTotal] = useState(0);
    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
    const [errMsg, setErrMsg] = useState('');
    const supervisado = [{id:'true', name:'Si'},{id:'false', name:'No'}];
    

    async function loadPage(page) {
        
        const response = (await axios.get('promoter/record/pending/?page=' + page, config)).data;
        setTotal(response.count);
        setData(response.data);
    }
    async function loadzones() {
        let supervi = [];
        const response = (await axios.get('promoter/zone/', config)).data;
        setzone(response);
        const response2 = (await axios.get('accounts/?role=supervisor', config)).data;

        response2.map((item) => {
            item.name = item.first_name + ' ' + item.last_name;
            item.id = item.id;
            supervi.push(item);
        })
        console.log(supervi);
        setsupervisor(supervi);
    }

    const report = async (e) => {
        e.preventDefault();
        const targets = e.target;
        try {
            const response = await axios.post('promoter/record/',
                {
                    start_date: targets[0].value,
                    end_date: targets[1].value,
                    was_supervised: targets[2].value,
                    wake_up_calls: targets[3].value,
                    people_called: targets[4].value,
                    promoter_notes: targets[5].value,
                    zone: targets[6].value,

                }, config
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
                            <Input key='start_date' label='Fecha de inicio:' type='datetime-local' />
                            <Input key='end_date' label='Fecha de fin' type='datetime-local' />
                            <Select key='was_supervised' label='Fue supervisado?' options={supervisado} />
                            <Select key='supervisor' label='Supervisor' options={supervisor} />
                            <Input key='wake_up_calls' label='Numero de llamados de atención:' />
                            <Input key='people_called' label='Total personas con llamados de atención:' />
                            <Input key='promoter_notes' label='Notas:' />
                            <Select key='zone' label='Zona:' options={zone} />
                            <p>{errMsg}</p>
                            <input className='gradient-button' type="submit" value="Registrar" />
                        </form>
                </div>
            </section>
        </div>
    </div>} data={data} loadPage={loadPage} total={total} />
    )
}
export default Promoterhours