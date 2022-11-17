import React, { useContext, useEffect, useRef, useState } from 'react'

import axios from 'context/axios'

import './Login.css'
import logo from 'assets/logo.svg'
import AuthContext from 'context/AuthProvider'
import { useCookies } from 'react-cookie';


const Iforgot = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();

    const [email, setsetEmail] = useState('');  // TODO remove this
    const [sending_method, setsending_method] = useState('');
    const [pwd, setPwd] = useState('');
    const [code, setCode] = useState('');
    const [success, setSuccess] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [cookies, setCookie] = useCookies(['Token']);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, sending_method, success])


    const Iforgot = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('accounts​/users​/send_reset_code​/',
                {
                    email: email,
                    sending_method: sending_method
                }
            )
            // return redirect to iforgotSetPw
            setShowLogin(!showLogin);     
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Emal or Sending Method');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Recovery Failed');
            }
        }
    }

    const IforgotSetPw = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('accounts/users/set_new_password/',
                {
                    email: email,
                    code: code,
                    password: pwd
                }
            )
            setErrMsg('Password Changed Successfully please login');
            setSuccess(true);  
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Emal or Sending Method');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Recovery Failed');
            }
        }
    }
    
    return (
        <section className='Login'>
            <div className="col">
                <h3>Recupera el acceso a tu cuenta</h3>
                <div className="row">
                    <img src={logo} alt='logo' width='48' />
                    <h2 className='thin'>Uninorte</h2>
                </div>
                {showLogin ? <>
                    <form onSubmit={Iforgot}>
                        <div className="form-inner">
                            <label htmlFor="email">email: </label>
                            <input type="text" name='email' id='email' ref={emailRef} onChange={(e) => setsetEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="form-inner">
                            <label htmlFor="setsending_method">setsending method: </label>
                            <select name="setsending_method" id="setsending_method" ref={emailRef} onChange={(e) => setsending_method(e.target.value)}
                                value={sending_method} required>
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                            </select>
                        </div>
                        <p className='error'>{errMsg}</p>
                        <input className='gradient-button' type="submit" value="Recuperar" />
                    </form>
                    <p> ya tengo un codigo de recuperacion <a className='prose prose-a:text-blue-600 hover:prose-a:text-blue-500' href='#' onClick={() => setShowLogin(!showLogin)}>Recuperar ahora</a></p>
                    <p>¿Ya tienes una cuenta?  <a className='prose prose-a:text-blue-600 hover:prose-a:text-blue-500'  href='/'>Inicia sesión</a></p>
                </> : <>
                <form onSubmit={IforgotSetPw}>
                        <div className="form-inner">
                            <label htmlFor="email">email: </label>
                            <input type="text" name='email' id='email' ref={emailRef} onChange={(e) => setsetEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="form-inner">
                            <label htmlFor="code">code: </label>
                            <input type="text" name='code' id='code'  onChange={(e) => setCode(e.target.value)}
                                value={code}
                                required
                            />
                        </div>
                        <div className="form-inner">
                            <label htmlFor="password">Nueva contraseña: </label>
                            <input type="password" name='password' id='password' onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <p className='error'>{errMsg}</p>
                        <input className='gradient-button' type="submit" value="Recuperar" />
                    </form>
                    <p>Se ha enviado un código de verificación a tu correo electrónico</p>
                    <p>¿No has recibido el correo?  <a className='prose prose-a:text-blue-600 hover:prose-a:text-blue-500'  href='/'>Inicia sesión</a></p>
                </>
                }
            </div>
        </section>
    )
}

export default Iforgot