import React from 'react';
import { Helmet } from 'react-helmet';
import './login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import { useForm } from 'react-hook-form';

// const { register, handleSubmit, watch, errors } = useForm();

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const localdata = localStorage.getItem('user');
  console.log(localdata);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    try {
      e.preventDefault();
      console.log('testbalramss', user);
      const response = await axios.post('http://localhost:9002/login', user);

      //console.log('LOGIN DATA -----> ', data);
      // if(user && user.id){

      // }
      // console.log(setLoginUser, 'sss');
      //alert(data.message);

      if (response?.data?.data) {
        // if(response && response.data && response.data.data)
        const user = response?.data?.data;
        setLoginUser(user);
        console.log('user->>>>>>>', user);
        saveLocalUSer(user);
        navigate('/');
      } else {
        alert(response?.data?.message);
      }

      // console.log('data--->', data);
      // setLoginUser(data.user);
      // console.log(data.user);
    } catch (error) {
      console.log('error-->', error);
    }

    // const { data } = axios
    //   .post('http://localhost:9002/login', user)
    //   // .then((res) => {
    //   //   alert(res.data.message);
    //     setLoginUser(res.data.user);
    //     navigate('/');
    //   }
  };
  const saveLocalUSer = (user) => {
    if (user === null) {
      localStorage.setItem('user', JSON.stringify());
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  useEffect(() => {
    if (localdata) {
      navigate('/');
    }
  }, [navigate, localdata]);

  return (
    !localdata && (
      <>
        <div>
          <Helmet>
            <title>bhag</title>
            <meta name='description' content='Helmet application' />
          </Helmet>
        </div>
        <form onSubmit={login} method='post'>
          <div className='login'>
            {/* {console.log('User', user)} */}
            <h1>Login</h1>

            <input
              type='email'
              name='email'
              value={user.email}
              placeholder='Enter your Email'
              onChange={handleChange}
              required
            ></input>
            <input
              type='password'
              name='password'
              value={user.password}
              placeholder='Enter your Password'
              onChange={handleChange}
              required
            ></input>

            <input type='submit' value='Login'></input>

            <button
              className='button-logout'
              onClick={() => navigate('/forgotpassword')}
            >
              Forgot Password?
            </button>

            <div>or</div>

            <button onClick={() => navigate('/signup')}>Register</button>
          </div>
        </form>
      </>
    )
  );
};

export default Login;
