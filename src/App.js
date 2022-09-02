//import logo from './logo.svg';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
//import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
//  import Form from './components/homepage/form';
//  import Todo from './components/homepage/Todo';
//  import ToDolist from './components/homepage/ToDoList';

import Signup from './components/signup/signup';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useState } from 'react';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './components/resetPassword/resetPassword';

function App() {
  const [user, setLoginUser] = useState({});
  const localdata = localStorage.getItem('user');
  console.log('localdata--->', localdata);
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={
              !localdata ? <Navigate replace to='/login' /> : <Homepage />
            }
          />
          {/* <Route
            exact
            path='/'
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          /> */}
          <Route exact path='/' element={<Homepage />}></Route>
          <Route
            path='/login'
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
