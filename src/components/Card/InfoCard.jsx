import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import './InfoCard.css';

const InfoCard = () => {
  return (
    <div className='container'>
        <div className='stadistic'>
            <div>
              <h3>500</h3>
            </div>
            <div>
              <p>Grupos Activos</p>
            </div>
        </div>
        <div className='logo'>
            <GroupsIcon/>
        </div>
    </div>
  )
}

export default InfoCard;