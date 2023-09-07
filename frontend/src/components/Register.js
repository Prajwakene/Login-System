
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/register', { username, password });
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-50">
      <div className="bg-white p-3 rounded w-25">
      <h2>SignUp</h2>
      <br />
      <form onSubmit={handleRegister}>
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
        <button type="submit" className='form-control rounded-0'>Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
