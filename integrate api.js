const express = require('express');
const app = express();
const axios = require('axios');
const multer = require('multer');
const bcrypt = require('bcrypt');

// OpenText API credentials
const opentextUsername = 'your-opentext-username';
const opentextPassword = 'your-opentext-password';
const opentextMessagingApiUrl = 'https://your-opentext-messaging-api-url.com/api/v1/messaging';
const opentextContentStorageApiUrl = 'https://your-opentext-content-storage-api-url.com/api/v1/content';

// Set up Multer for file uploads
const upload = multer({ dest: './uploads/' });

// Set up Express routes
app.post('/send-message', async (req, res) => {
  // Authenticate with OpenText Messaging API
  const authResponse = await axios.post(`${opentextMessagingApiUrl}/auth`, {
    username: opentextUsername,
    password: opentextPassword
  });
  const messagingToken = authResponse.data.token;

  // Send message using OpenText Messaging API
  const messageResponse = await axios.post(`${opentextMessagingApiUrl}/messages`, {
    to: req.body.to,
    subject: req.body.subject,
    body: req.body.body
  }, {
    headers: {
      Authorization: `Bearer ${messagingToken}`
    }
  });

  res.json(messageResponse.data);
});

app.post('/upload-document', upload.single('file'), async (req, res) => {
  // Authenticate with OpenText Content Storage API
  const authResponse = await axios.post(`${opentextContentStorageApiUrl}/auth`, {
    username: opentextUsername,
    password: opentextPassword
  });
  const storageToken = authResponse.data.token;

  // Upload document using OpenText Content Storage API
  const fileBuffer = req.file.buffer;
  const uploadResponse = await axios.post(`${opentextContentStorageApiUrl}/content`, fileBuffer, {
    headers: {
      Authorization: `Bearer ${storageToken}`,
      'Content-Type': 'application/octet-stream'
    }
  });

  res.json(uploadResponse.data);
});

app.get('/get-document', async (req, res) => {
  // Authenticate with OpenText Content Storage API
  const authResponse = await axios.post(`${opentextContentStorageApiUrl}/auth`, {
    username: opentextUsername,
    password: opentextPassword
  });
  const storageToken = authResponse.data.token;

  // Retrieve document using OpenText Content Storage API
  const documentResponse = await axios.get(`${opentextContentStorageApiUrl}/content/${req.query.documentId}`, {
    headers: {
      Authorization: `Bearer ${storageToken}`
    }
  });

  res.json(documentResponse.data);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
