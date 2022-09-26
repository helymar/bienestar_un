import React from 'react'

const FormField = (props) => {
    return (
        <div className='form-inner'>
            <label htmlFor={props.key}>{props.label}</label>
            <input className='border-2 border-blue-800/80 rounded-md mx-2' type={props.type ?? 'input'} name={props.key} id={props.key} ref={props.ref} onChange={props.onChange}
                value={props.value}
                required
            />
        </div>
    )
}

export default FormField