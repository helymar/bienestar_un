import React, { useContext, useEffect, useRef, useState } from 'react'

import axios from 'context/axios'

import './Login.css'
import logo from 'assets/logo.svg'
import AuthContext from 'context/AuthProvider'
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

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, success])


    const login = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('/accounts/auth/login/',
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

                        <div className="flex items-start mt-2 mb-5 flex-col">
                            <label>Username: </label>
                            <input className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm' type="text" name='username' id='username' ref={userRef} onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>

                        <div className="flex items-start mt-2 mb-5 flex-col">
                            <label>Password: </label>
                            <input className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm' type="password" name='password' id='password' onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>

                        <p className='error'>{errMsg}</p>
                        <input className='mt-2 bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm' type="submit" value="Iniciar sesión" />
                    
                    </form>
                    <p className='mt-5'>¿Aún no tienes una cuenta? <a className='prose prose-a:text-blue-600 underline text-blue-500' href='#' onClick={() => setShowLogin(!showLogin)}>Registrate</a></p>
                    <p className='mt-5'>¿Olvidaste tu contraseña? <a className='prose prose-a:text-blue-600 underline text-blue-500' href='/iforgot'>Recuperala</a></p>
                </> : <>

                    <div id="form" className="block bg-slate-50 p-6 rounded-xl shodow-md shadow-slate-300 w-90">
                        <form onSubmit={register}>

                            <div id="fullName" className="flex flex-row">

                                <div id="firstName" className="w-1/2 mr-1">
                                    <label className="text-sm">Nombre</label>
                                    <input type="text" name="name" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"/>
                                </div>
                                <div id="lastName" className="w-1/2 mr-1">
                                    <label className="text-sm">Nombre De Usuario</label>
                                    <input type="text" name="username" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"/>
                                </div>
                            </div>

                            <div className='flex items-start mt-2 mb-2 flex-col'>
                                <label className="text-sm mb-1 mt-1">Código</label>
                                <input type="emial" name="ciu" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"/>
                            </div>
                            
                            <div className='flex items-start mt-2 mb-2 flex-col'>
                                <label className="text-sm mb-1 mt-1">Email</label>
                                <input type="emial" name="email" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"/>
                            </div>

                            <div className='flex items-start mt-2 mb-2 flex-col'>
                                <label className="text-sm mb-1 mt-1">Contraseña</label>
                                <input type="emial" name="password" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"/>
                            </div>

                            <div className='flex items-start mt-2 mb-2 flex-col'>
                                <label className="text-sm mb-1 mt-1">Confirmar Contraseña</label>
                                <input type="emial" name="confirm_password" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"/>
                            </div>


                            <input type="submit" name="" className="mt-2 bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm"/>
                            <p className='mt-5'>¿Ya tienes una cuenta? <a className='prose prose-a:text-blue-600 underline text-blue-500' href='#' onClick={() => setShowLogin(!showLogin)}>Inicia sesión</a></p>
                        
                        </form>
                    </div>
                </>
                }
            </div>
        </section>
    )
}

export default Login