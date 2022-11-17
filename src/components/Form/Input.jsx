import React from 'react'

const Input = (props) => {
    return (
        <div className='flex items-start mt-2 mb-2 flex-col'>
            <label className='text-sm mb-1 mt-1' htmlFor={props._key}>{props.label}</label>
            <input className={`${props.type == 'checkbox' ? '' : 'w-full'} h-8 rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm`}
                type={props.type} name={props._key} id={props._key} ref={props.ref} onChange={props.onChange} value={props.value} required />
        </div>
    )
}

export default Input