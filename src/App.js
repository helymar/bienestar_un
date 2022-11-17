import { useContext } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie';

import 'App.css';
import Activities from 'views/Activities';
import AuthContext from 'context/AuthProvider';
import Dashboard from 'views/Home';
import Groups from 'views/Groups';
import Login from 'views/Auth/Login';
import Iforgot from 'views/Auth/iforgot';
import Reports from 'views/Reports';
import Settings from 'views/Settings';
import Supervisor from 'views/Supervisor';
import Promoter from 'views/Promoter';
import SidebarAdmin from 'components/sidebar/SidebarAdmin';
import SidebarPromotor from 'components/sidebar/SidebarPromotor';
import SidebarSupervisor from 'components/sidebar/SidebarSupervisor';
import SidebarGrupo from 'components/sidebar/SidebarGrupo';
import Users from 'views/Users';


function App() {
  const [cookies, setCookie] = useCookies(['name']);
  const { auth } = useContext(AuthContext);
 

  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }
  return (
    <section className='App'>
      {auth.user == null ?
       
        (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/iforgot' element={<Iforgot />} />
          </Routes>
        </BrowserRouter>
        )
        :
        auth.role == 'promotor' ?
       
        (
          <section className='AppGlass'>
          <BrowserRouter>
            <SidebarPromotor />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/promoter' element={<Promoter />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </BrowserRouter>
        </section>
        )
        :
        auth.role == 'grupo' ?
        (
          <section className='AppGlass'>
            <BrowserRouter>
              <SidebarGrupo />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/groups' element={<Groups />} />
                <Route path='/activities' element={<Activities />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/supervisor' element={<Supervisor />} />
                <Route path='/promoter' element={<Promoter />} />
              </Routes>
            </BrowserRouter>
          </section>
        )
        :
        auth.role == 'supervisor' ?
        (
          <section className='AppGlass'>
            <BrowserRouter>
              <SidebarSupervisor />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/supervisor' element={<Supervisor />} />
                <Route path='/settings' element={<Settings />} />
              </Routes>
            </BrowserRouter>
          </section>
        )
        : auth.role == 'administrador' 
        (
          <section className='AppGlass'>
            <BrowserRouter>
              <SidebarAdmin />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/groups' element={<Groups />} />
                <Route path='/activities' element={<Activities />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/settings' element={<Settings />} />
              </Routes>
            </BrowserRouter>
          </section>
        )
      }
    </section>
  );
}

export default App;
