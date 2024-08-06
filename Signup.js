import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user account with OpenText Messaging API
      const messagingResponse = await axios.post('https://your-opentext-messaging-api-url.com/api/v1/users', {
        username,
        email,
        password: hashedPassword
      });

      const messagingUserId = messagingResponse.data.userId;

      // Create new user account with OpenText Content Storage API
      const storageResponse = await axios.post('https://your-opentext-content-storage-api-url.com/api/v1/users', {
        username,
        email,
        password: hashedPassword
      });

      const storageUserId = storageResponse.data.userId;

      // Set DECCAAN DNA number (unique identifier)
      const deccaanDnaNumber = generateDeccaanDnaNumber(username, email);

      // Create new user profile in MongoDB
      const userProfile = {
        username,
        email,
        deccaanDnaNumber,
        messagingUserId,
        storageUserId
      };

      await axios.post('https://your-mongodb-api-url.com/api/v1/users', userProfile);

      // Redirect to login page
      history.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const generateDeccaanDnaNumber = (username, email) => {
    // Generate a unique DECCAAN DNA number based on username and email
    // This is a placeholder implementation, you should implement a more secure and robust way to generate the DECCAAN DNA number
    return `${username}${email.replace('@', '')}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        <br />
        <button type="submit">Sign up</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Signup;
