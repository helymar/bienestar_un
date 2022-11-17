import React from 'react'

import './MainPanel.css'
import StatisticCard from 'components/Card/StatisticCard'
import DataTable from 'components/Table/DataTablePromoterhours'

const MainPanel = (props) => {
    return (
        <section className='MainPanel'>
            <div className='title'>
                <h1>{props.title}</h1>
            </div>
            <div className='row'>
                <div className='col twice'>
                    {props.card1}
                </div>
                {props.rightContent ? props.rightContent :
                    <DataTable data={props.data} loadPage={props.loadPage} total={props.total} />}
            </div>
        </section>
    )
}

export default MainPanel
