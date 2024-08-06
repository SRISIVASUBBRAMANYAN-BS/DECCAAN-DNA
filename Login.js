import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Authenticate with OpenText Messaging API
      const messagingResponse = await axios.post('https://your-opentext-messaging-api-url.com/api/v1/auth', {
        username,
        password: hashedPassword
      });

      const messagingToken = messagingResponse.data.token;

      // Authenticate with OpenText Content Storage API
      const storageResponse = await axios.post('https://your-opentext-content-storage-api-url.com/api/v1/auth', {
        username,
        password: hashedPassword
      });

      const storageToken = storageResponse.data.token;

      // Set token for future API requests
      setToken({ messagingToken, storageToken });

      // Redirect to medical dashboard
      history.push('/medical-dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Login;
