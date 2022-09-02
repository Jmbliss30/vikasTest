import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: '',
  });

  const navigate = useNavigate();
  const CheckEmail = async (e) => {
    try {
      e.preventDefault();
      console.log('user --->', user);
      const emailResponse = await axios.post(
        'http://localhost:9002/checkByEmail',
        user
      );
      if (emailResponse?.data?.data) {
        navigate('/resetPassword', { state: emailResponse?.data?.data });
      } else {
        alert(emailResponse?.data?.message);
      }
    } catch (error) {
      console.log('error-->', error);
    }
  };

  const handleEmail = (email) => {
    const user = {
      email,
    };

    setUser(user);
  };

  return (
    <form onSubmit={CheckEmail}>
      <div className='login'>
        <span>Forget Password?</span>
        <input
          type='email'
          name='email'
          placeholder='Enter Email address'
          required
          onChange={(e) => handleEmail(e.target.value)}
        ></input>
        <input type='submit' value='Submit' />
      </div>
    </form>
  );
};

export default ForgotPassword;
