import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@material-ui/core';
import { Multer } from 'multer';

const MedicalDetailsForm = () => {
  const { patientId } = useParams();
  const history = useHistory();
  const [medicalRecord, setMedicalRecord] = useState({
    name: '',
    description: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMedicalRecord({ ...medicalRecord, [name]: value });
  };

  const handleFileChange = (event) => {
    setMedicalRecord({ ...medicalRecord, file: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('name', medicalRecord.name);
    formData.append('description', medicalRecord.description);
    formData.append('file', medicalRecord.file);

    try {
      const response = await axios.post(`https://your-opentext-content-storage-api-url.com/api/v1/medical-records/${patientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const medicalRecordId = response.data.id;

      // Save medical record to MongoDB
      await axios.post(`https://your-mongodb-api-url.com/api/v1/medical-records`, {
        patientId,
        medicalRecordId,
        name: medicalRecord.name,
        description: medicalRecord.description
      });

      setUploading(false);
      history.push(`/patients/${patientId}/medical-records`);
    } catch (error) {
      setUploading(false);
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Medical Details Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    value={medicalRecord.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={medicalRecord.description}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MedicalDetailsForm;
