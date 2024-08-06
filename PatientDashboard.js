import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

const PatientDashboard = () => {
  const { patientId } = useParams();
  const history = useHistory();
  const [patientData, setPatientData] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/patients/${patientId}`);
      setPatientData(response.data);
    };

    const fetchMedicalRecords = async () => {
      const response = await axios.get(`https://your-opentext-content-storage-api-url.com/api/v1/medical-records/${patientId}`);
      setMedicalRecords(response.data);
    };

    const fetchMessages = async () => {
      const response = await axios.get(`https://your-opentext-messaging-api-url.com/api/v1/messages/${patientId}`);
      setMessages(response.data);
    };

    fetchPatientData();
    fetchMedicalRecords();
    fetchMessages();
  }, [patientId]);

  const handleSendMessage = async () => {
    const response = await axios.post(`https://your-opentext-messaging-api-url.com/api/v1/messages`, {
      patientId,
      message: newMessage
    });

    setMessages([...messages, response.data]);
    setNewMessage('');
  };

  const handleViewMedicalRecord = (medicalRecordId) => {
    history.push(`/medical-records/${medicalRecordId}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Patient Dashboard
            </Typography>
            <Typography variant="body1" component="p">
              Patient ID: {patientId}
            </Typography>
            <Typography variant="body1" component="p">
              Name: {patientData && patientData.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Medical Records
            </Typography>
            <ul>
              {medicalRecords.map((medicalRecord) => (
                <li key={medicalRecord.id}>
                  <Button onClick={() => handleViewMedicalRecord(medicalRecord.id)}>
                    {medicalRecord.name}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Messages
            </Typography>
            <ul>
              {messages.map((message) => (
                <li key={message.id}>
                  <Typography variant="body1" component="p">
                    {message.message}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography variant="body1" component="p">
              <input
                type="text"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                placeholder="Type a message..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PatientDashboard;
