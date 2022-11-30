import React from 'react'

import './MainPanel.css'
import StatisticCard from 'components/Card/StatisticCard'
import DataTable from 'components/Table/DataTable'

const MainPanel = (props) => {
    return (
        <section className='MainPanel'>
            <div className='title'>
                <h1>{props.title}</h1>
            </div>
            <div className='row'>
                {props.rightContent ? props.rightContent :
                    <DataTable data={props.data} />}
            </div>
        </section>
    )
}

export default MainPanel
