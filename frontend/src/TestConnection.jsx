// TestConnection.jsx
import React, { useEffect } from 'react';
import axios from 'axios';

const TestConnection = () => {
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => console.log('Backend Response:', res.data))
      .catch(err => console.error('Error connecting to backend:', err));
  }, []);

  return <h1>Testing Backend Connection...</h1>;
};

export default TestConnection;
