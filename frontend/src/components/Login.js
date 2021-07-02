import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onLogin({
      email,
      password,
    });
  };

  return (
    <div className='register'>
      <form action='#' onSubmit={handleSubmit} className='register__form'>
        <h2 className='register__title'>Log in</h2>
        <input
          required
          className='register__input'
          name='email'
          type='email'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className='register__input'
          name='password'
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='register__button'>
          Log in
        </button>
        <Link to='/signin' className='register__caption'>
          Not a member yet? Sign up here!
        </Link>
      </form>
    </div>
  );
}

export default Login;
