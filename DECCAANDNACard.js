import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';
import { Multer } from 'multer';

const DECCAANDNACard = () => {
  const { patientId } = useParams();
  const [deccaaanDna, setDeccaaanDna] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      const response = await axios.post(`https://your-opentext-content-storage-api-url.com/api/v1/deccaaan-dna/${patientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const deccaaanDnaId = response.data.id;

      // Save deccaaan dna to MongoDB
      await axios.post(`https://your-mongodb-api-url.com/api/v1/deccaaan-dna`, {
        patientId,
        deccaaanDnaId
      });

      setUploading(false);
      setDeccaaanDna(response.data);
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
              DECCAAN DNA
            </Typography>
            {deccaaanDna ? (
              <>
                <Typography variant="body1" component="p">
                  DECCAAN DNA ID: {deccaaanDna.id}
                </Typography>
                <Typography variant="body1" component="p">
                  Patient ID: {patientId}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1" component="p">
                  No DECCAAN DNA data available.
                </Typography>
                <input
                  type="file"
                  onChange={handleUpload}
                  disabled={uploading}
                />
                {uploading && <p>Uploading...</p>}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DECCAANDNACard;
