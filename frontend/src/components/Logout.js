
import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/api/logout');
      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-50">
    <div className="bg-white p-3 rounded w-25">
      <h2>Logout</h2>
      <br />
      <button onClick={handleLogout} className='form-control rounded-0'>Logout</button>
    </div>
    </div>
  );
};

export default Logout;
