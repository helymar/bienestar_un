import React from 'react'

const FormField = (props) => {
    return (
        <div className='flex items-start mt-2 mb-2 flex-col'>
            <label className='text-sm mb-1 mt-1' htmlFor={props.key}>{props.label}</label>
            <input className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm' type={props.type ?? 'input'} name={props.key} id={props.key} ref={props.ref} onChange={props.onChange}
                value={props.value}
                required
            />
        </div>
    )
}

export default FormField