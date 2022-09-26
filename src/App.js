import { useContext } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'App.css';
import Activities from 'views/Activities';
import AuthContext from 'context/AuthProvider';
import Dashboard from 'views/Home';
import Groups from 'views/Groups';
import Login from 'views/Auth/Login';
import Reports from 'views/Reports';
import Settings from 'views/Settings';
import Sidebar from 'components/sidebar/Sidebar';
import Users from 'views/Users';


function App() {
  const { auth } = useContext(AuthContext);
  return (
    <section className='App'>
      {auth.user == null ?
        <Login /> :
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
              </Routes>
            </BrowserRouter>
          </section>
        )
      }
    </section>
  );
}

export default App;
