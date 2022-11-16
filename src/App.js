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
import Sidebar from 'components/sidebar/Sidebar';
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

        (
          <section className='AppGlass'>
            <BrowserRouter>
              <Sidebar />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/groups' element={<Groups />} />
                <Route path='/activities' element={<Activities />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/supervisor' element={<supervisor />} />
                <Route path='/promoter' element={<promoter />} />
              </Routes>
            </BrowserRouter>
          </section>
        )
      }
    </section>
  );
}

export default App;
