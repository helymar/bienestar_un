import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { useParams } from "react-router-dom";

import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelActivity';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import TextArea from 'components/Form/TextArea';


const ActivityDetail = () => {
    const { auth } = useContext(AuthContext);
    const activityRef = useRef();
    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
    const [data, setData] = useState([]);
    const [activity, setActivity] = useState();
    const [card1, setCard1] = useState({});
    const [card2, setCard2] = useState({});
    const [errMsg, setErrMsg] = useState('');
    const dataBool= [
        {name: 'SI',
        id: true},
        {name: 'NO',
        id: false}
       ];
       const dataCategory= [
        {name: 'Capacitación',
        id: 'cap'},
        {name: 'Campaña en redes sociales',
        id: 'crs'},
        {name: 'Evento abierto',
        id: 'eab'},
        {name: 'Evento de bienestar universitario',
        id: 'ebu'},
        {name: 'Evento masivo',
        id: 'ema'},
        {name: 'Actividades internas',
        id: 'int'},
        {name: 'Publicaciones',
        id: 'pub'},
        {name: 'No encontrado',
        id: 'nan'}
         ];
        const notas = [{'Notas Orieta': 'na'}, {'Notas Marcela': 'Recibido'}]
    async function get() {
       
        const card1 = {
            title: 'Recibidas',
            firstNumber: 100,
            firstText: 'Solicitudes recibidas',
            secondNumber: 14,
            secondText: 'Aprobadas'
        }
        const card2 = {
            title: 'Solicitudes',
            firstNumber: 5,
            firstText: 'Pendientes',
            secondNumber: 2,
            secondText: 'En Tramite'
        }
        setCard1(card1);
        setCard2(card2);
    }

    const create = async (e) => {
        e.preventDefault();
        const targets = e.target;
         //create a json object with the data
        const activity = {
            ext_id: targets[0].value,
            name: targets[1].value,
            description: targets[2].value,
            category: targets[3].value,
            start_date: targets[4].value,
            end_date: targets[5].value,
            responsible: targets[6].value,
            is_virtual:  (targets[7].value === 'true'),
            institutional: targets[8].value, 
            bienestar: targets[9].value,
            has_guests: (targets[10].value === 'true'),
            guests_info: targets[11].value,
            local_guests: parseInt(targets[12].value, 10),
            national_guests: parseInt(targets[13].value, 10),
            international_guests: parseInt(targets[14].value, 10),
            event_url: targets[15].value,
            comments: targets[16].value,
            notes: notas,
            send_email: (targets[18].value === 'true'), 
        }
        console.log(activity);
        const response = (await axios.post('accounts/activity/', activity, config)).data;
        console.log(response);
        const card1 = {
            title: 'Recibidas',
            firstNumber: 100,
            firstText: 'Solicitudes recibidas',
            secondNumber: 14,
            secondText: 'Aprobadas'
        }
        const card2 = {
            title: 'Solicitudes',
            firstNumber: 5,
            firstText: 'Pendientes',
            secondNumber: 2,
            secondText: 'En Tramite'
        }
        setCard1(card1);
        setCard2(card2);
    }

    useEffect(() => { get(); }, [])
    return (
        <section className='Activity' style={{ overflow: 'scroll', padding: 30 }}>
            <a href='/activities' className='gradient-link'>Regresar</a>
            <form onSubmit={create}>
                <Input key='ext_id' label='Id' />
                <Input key='name' label='Nombre'/>
                <TextArea key='description' label='Descripción' />
                <Select key='category' label='Categoría:' options={dataCategory} />
                <Input key='start_date' label='Fecha de inicio' type='datetime-local'/>
                <Input key='end_date' label='Fecha de finalización'  type='datetime-local'/>
                <Input key='responsible' label='Responsable'/>
             
                <Select key='is_virtual' label='Es virtual:' options={dataBool} />

                <Input key='institutional' label='Institucional'  />
                <Input key='bienestar' label='Bienestar' />
                <Select key='has_guests' label='Posee invitados:' options={dataBool} />
                <Input key='guests_info' label='Información de invitados' />
                <Input key='local_guests' label='Invitados locales' type='number'/>
                <Input key='national_guests' label='Invitados nacionales' type='number' />
                <Input key='international_guests' label='Invitados internacionales'  type='number' />
                <Input key='event_url' label='Url del evento' />
                <Input key='comments' label='Comentarios' />
                <Select key='send_email' label='Enviar correo:' options={dataBool} />
                <p className='error'>{errMsg}</p>
                <input className='mt-2 bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm' type="submit" value="Crear" />
            </form>
        </section >
    )
}
export default ActivityDetail