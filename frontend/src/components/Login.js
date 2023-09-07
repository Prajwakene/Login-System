
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/login', { username, password });
      console.log('Login successful');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-50">
      <div className="bg-white p-3 rounded w-25">
      <h2>SignIn</h2>
      <br />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className='form-control rounded-0'
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className='form-control rounded-0'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit" className='form-control rounded-0'>Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
