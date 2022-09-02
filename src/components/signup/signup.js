import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './signup.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    const { name, email, password, reEnterPassword } = user;
    const obj = {
      name,
      email,
      password,
      reEnterPassword,
    };

    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test()) {
    //   return true;
    // }
    // alert('You have entered an invalid email address!');
    // return false;
    // const emailvalid = () => {
    //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    //   return true;
    // };

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      axios.post('http://localhost:9002/signup', user).then((res) => {
        if (res.data.status === 0) {
          alert('USer Already exist');
          navigate('/login');
        } else {
          navigate('/login');
        }
      });
    } else {
      alert('wrong email format');
    }
  };

  return (
    <div className='application'>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content='Helmet application' />
        <title>vikas</title>
        <link rel='canonical' href='http://mysite.com/signup' />
      </Helmet>

      <form onSubmit={register} method='post'>
        <div className='register'>
          <h1>Signup</h1>
          <input
            type='text'
            name='name'
            value={user.name}
            onChange={handleChange}
            placeholder='Enter your Name'
            required
          ></input>
          <input
            type='email'
            name='email'
            value={user.email}
            onChange={handleChange}
            placeholder='Enter your Email'
            required
          ></input>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            value={user.password}
            placeholder='Enter your Password'
            required
          />
          <input
            type='password'
            name='reEnterPassword'
            onChange={handleChange}
            value={user.reEnterPassword}
            placeholder='Re-Enter your Password'
            required
          ></input>

          <input type='submit' value='Sign up' />
          <div>or</div>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
