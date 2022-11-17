import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import { useParams } from "react-router-dom";

import AuthContext from 'context/AuthProvider';
import axios from 'context/axios'
import MainPanel from 'components/MainPanel/MainPanelActivity';
import Input from 'components/Form/Input';
import TextArea from 'components/Form/TextArea';


const ActivityDetail = () => {
    const { auth } = useContext(AuthContext);
    const activityRef = useRef();
    const config = { 'headers': { 'Authorization': 'Token ' + auth.accessToken } }
    const [data, setData] = useState([]);
    const [activity, setActivity] = useState({
        id: 0,
        status: "",
        ext_id: "",
        responsible: "",
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        category: "",
        is_virtual: true,
        institutional: "",
        bienestar: "",
        has_guests: false,
        guests_info: "",
        local_guests: 0,
        national_guests: 0,
        international_guests: 0,
        event_url: "",
        comments: "",
        send_email: false,
        notes: "",
        group: 68
    });
    const [card1, setCard1] = useState({});
    const [card2, setCard2] = useState({});
    const [errMsg, setErrMsg] = useState('');
    const { id } = useParams();
    async function get() {
        const response = (await axios.get(`accounts/activity/${id}/`, config)).data;
        setActivity(response);
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

    const update = async (e) => {
        e.preventDefault();
        const response = (await axios.put(`accounts/activity/${id}/`, activity, config)).data;
        setData(response.body);
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
            <form onSubmit={update}>
                <Input _key='code' label='Id' value={activity.ext_id} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ 'ext_id': e.target.value } }))}  />
                <Input _key='name' label='Nombre' value={activity.name} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ name: e.target.value } }))} />
                <TextArea _key='description' label='Descripción' value={activity.description} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ description: e.target.value } }))} />
                <Input _key='group' label='Grupo' value={activity.group} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ group: e.target.value } }))} />
                <Input _key='category' label='Categoría' value={activity.category} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ category: e.target.value } }))} />
                <Input _key='start_date' label='Fecha de inicio' value={activity.start_date}  editable={false} type='datetime-local'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ start_date: e.target.value } }))} />
                <Input _key='end_date' label='Fecha de finalización' editable={false} value={activity.end_date} type='datetime-local'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ end_date: e.target.value } }))} />
                <Input _key='status' label='Estado' value={activity.status} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ status: e.target.value } }))} />
                <Input _key='responsible' label='Responsable' editable={false} value={activity.responsible}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ responsible: e.target.value } }))} />
                <Input _key='is_virtual' label='Es virtual' editable={false}  value={activity.is_virtual} type='checkbox'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ is_virtual: e.target.value } }))} />
                <Input _key='institutional' label='Institucional' editable={false} value={activity.institutional}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ institutional: e.target.value } }))} />
                <Input _key='bienestar' label='Bienestar' editable={false} value={activity.bienestar}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ bienestar: e.target.value } }))} />
                <Input _key='has_guests' label='Posee invitados' editable={false} value={activity.has_guests} type='checkbox'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ has_guests: e.target.value } }))} />
                <Input _key='guests_info' label='Información de invitados' editable={false} value={activity.guests_info}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ guests_info: e.target.value } }))} />
                <Input _key='local_guests' label='Invitados locales' editable={false} value={activity.local_guests} type='number'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ local_guests: e.target.value } }))} />
                <Input _key='national_guests' label='Invitados nacionales' editable={false} value={activity.national_guests} type='number'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ local_guests: e.target.value } }))} />
                <Input _key='international_guests' label='Invitados internacionales' editable={false} value={activity.international_guests} type='number'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ local_guests: e.target.value } }))} />
                <Input _key='event_url' label='Url del evento' editable={false} value={activity.event_url}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ event_url: e.target.value } }))} />
                <Input _key='comments' label='Comentarios' editable={false} value={activity.comments}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ comments: e.target.value } }))} />
                <Input _key='notes' label='Notas' value={activity.notes} editable={false}
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ notes: e.target.value } }))} />
                <Input _key='send_email' label='Enviar correo' editable={false} value={activity.send_email} type='checkbox'
                    onChange={(e) => setActivity(Activity => ({ ...Activity, ...{ send_email: e.target.value } }))} />
                <p className='error'>{errMsg}</p>
            </form>
        </section >
    )
}
export default ActivityDetail