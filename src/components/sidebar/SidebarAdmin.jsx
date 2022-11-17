import React from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";

import './Sidebar.css'
import logo from 'assets/logo.svg'
import { SidebarData } from 'DataAdmin'

const SidebarAdmin = () => {
    return (

        <div className='Sidebar'>
            <div className='menuItem logo'>
                <img src={logo} alt='logo' />
            </div>
            <svg style={{width: '100%'}}>
                <defs>
                    <clipPath id="svgPath" >
                        <path d="M45 47C12.2 30.2 4 8.66667 4 0V490C4 469.5 13 451.5 47.5 432C75.1 416.4 83 392.5 83.5 382.5V103C83.5 99.5 86 68 45 47Z" fill="url(#paint0_linear_65_28)" />
                    </clipPath>
                </defs>
            </svg>
            <div className='middleHolder'>
                <div className='content' >
                    {SidebarData.map((item, i) => {
                        return (
                            <div className='menuItem' key={i}>
                                <Link to={item.route}>
                                    <item.icon color='white' fontSize='large' />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='menuItem settings'>
                <Link to='/settings'>
                    <SettingsOutlinedIcon fontSize='large' />
                </Link>
            </div>
        </div>
    )
}

export default SidebarAdmin