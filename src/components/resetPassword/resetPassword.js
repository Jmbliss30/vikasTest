import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [user, setUser] = useState({
    password: '',
    reEnterPassword: '',
  });
  const location = useLocation();

  const handePassword = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const UpdatePassword = (e) => {
    e.preventDefault();
    const { state } = location;
    const { password, reEnterPassword } = user;
    console.log('user --> ', user);
    const obj = {
      email: state.email,
      password,
      reEnterPassword,
    };

    if (password && reEnterPassword) {
      axios.post('http://localhost:9002/resetpassword', obj);
      alert('Password Changed, Please LogIn now!');
      navigate('/login');
    } else {
      alert('Wrong Input');
    }
  };

  return (
    <form onSubmit={UpdatePassword}>
      <div className='login'>
        <span>Change Password</span>
        <input
          type='password'
          name='password'
          placeholder='Enter New Password'
          required
          onChange={(e) => handePassword(e)}
        ></input>
        <input
          type='password'
          name='reEnterPassword'
          placeholder='Re-Enter New Password'
          required
          onChange={(e) => handePassword(e)}
        ></input>
        <input type='submit' value='Submit' />
      </div>
    </form>
  );
};

export default ResetPassword;
