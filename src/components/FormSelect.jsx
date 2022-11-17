import React from 'react'

const FormSelect = (props) => {
    let options = [];
    if (props.options) {
        for (let i = 0; i < props.options.length; i++) {
            options.push(<option value={props.options[i].id}>{props.options[i].name}</option>)
        }
    }
    
    return (
        <div className='flex items-start mt-2 mb-2 flex-col'>
            <label className='text-sm mb-1 mt-1' htmlFor={props.key}>{props.label}</label>
            <select className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'   name={props.key} id={props.key} ref={props.ref} onChange={props.onChange} value={props.value}
             required>
                {options}
            </select>
        </div>
    )
}

export default FormSelect