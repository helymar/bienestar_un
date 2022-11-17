import React from 'react'

const Select = (props) => {
    const type = props.type ?? 'input';
    const className = `${type != 'checkbox' ? 'w-full' : ''} rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm`;
    return (
        <div className='flex items-start mt-2 mb-2 flex-col'>
            <label className='text-sm mb-1 mt-1' htmlFor={props._key}>{props.label}</label>
            {type == 'textarea' ? <textarea className={className} type={type} name={props._key} id={props._key} ref={props.ref} onChange={props.onChange}
                value={props.value} rows="4" cols="50" required /> :
                <input className={`h-8 ${className}`} type={type} name={props._key} id={props._key} ref={props.ref} onChange={props.onChange}
                    value={props.value}
                    required
                />}
        </div>
    )
}

export default Select