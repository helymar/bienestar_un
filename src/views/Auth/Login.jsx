import React, { useContext, useEffect, useRef, useState } from 'react'

import axios from 'context/axios'

import './Login.css'
import logo from 'assets/logo.svg'
import AuthContext from 'context/AuthProvider'
import FormField from 'components/FormField'
import { useCookies } from 'react-cookie';


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();

    const [user, setUser] = useState('');  // TODO remove this
    const [pwd, setPwd] = useState('');
    const [success, setSuccess] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [cookies, setCookie] = useCookies(['Token']);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, success])


    const login = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('accounts/users/login/',
                {
                    username: user,
                    password: pwd
                }
            )
            let accessToken = response.data.token;
            
            setAuth({ user, accessToken });
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('user', user ); // TODO remove this, is not safe
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    const register = async (e) => {
        e.preventDefault();
        const targets = e.target;
        try {
            const response = await axios.post('accounts/register/register/',
                {
                    name: targets[0].value,
                    username: targets[1].value,
                    ciu: targets[2].value,
                    email: targets[3].value,
                    password: targets[4].value,
                    passwordConfirmation: targets[5].value,
                    role: 'persona'
                }
            )
            const accessToken = response?.data?.token;
            setAuth({ user, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
            console.log('Token:' + accessToken);
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    return (
        <section className='Login'>
            <div className="col">
                <h3>Inicia sesión con tu cuenta Uninorte</h3>
                <div className="row">
                    <img src={logo} alt='logo' width='48' />
                    <h2 className='thin'>Uninorte</h2>
                </div>
                {showLogin ? <>
                    <form onSubmit={login}>
                        <div className="form-inner">
                            <label htmlFor="username">Username: </label>
                            <input type="text" name='username' id='username' ref={userRef} onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        <div className="form-inner">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name='password' id='password' onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <p className='error'>{errMsg}</p>
                        <input className='gradient-button' type="submit" value="Iniciar sesión" />
                    </form>
                    <p>¿Aún no tienes una cuenta? <a className='prose prose-a:text-blue-600 hover:prose-a:text-blue-500' href='#' onClick={() => setShowLogin(!showLogin)}>Registrate</a></p>
                    <p>¿Olvidaste tu contraseña? <a className='prose prose-a:text-blue-600 hover:prose-a:text-blue-500' href='/iforgot'>Recuperala</a></p>
                </> : <>
                    <form onSubmit={register}>
                        <FormField key='name' label='Nombre:' />
                        <FormField key='username' label='Nombre de usuario:' />
                        <FormField key='ciu' label='Código:' />
                        <FormField key='email' label='Email:' />
                        <FormField key='password' label='Contraseña:' />
                        <FormField key='confirm_password' label='Confirmar contraseña:' />
                        <input className='gradient-button' type="submit" value="Registrarse" />
                    </form>
                    <p>¿Ya tienes una cuenta? <a href='#' onClick={() => setShowLogin(!showLogin)}>Inicia sesión</a></p>
                </>
                }
            </div>
        </section>
    )
}

export default Login