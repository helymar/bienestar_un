import React from 'react'

const TextArea = (props) => {
    return (
        <div className='flex items-start mt-2 mb-2 flex-col'>
            <label className='text-sm mb-1 mt-1' htmlFor={props._key}>{props.label}</label>
            <textarea className='w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm'
                name={props._key} id={props._key} ref={props.ref} onChange={props.onChange}
                value={props.value} rows="4" cols="50" required />
        </div>
    )
}

export default TextArea