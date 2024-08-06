import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core';

const PrintDECCAANDNACard = () => {
  const { patientId } = useParams();
  const [deccaaanDna, setDeccaaanDna] = useState(null);

  useEffect(() => {
    axios.get(`https://your-mongodb-api-url.com/api/v1/deccaaan-dna/${patientId}`)
      .then(response => {
        setDeccaaanDna(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [patientId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              DECCAAN DNA Card
            </Typography>
            {deccaaanDna ? (
              <>
                <Typography variant="body1" component="p">
                  Patient ID: {patientId}
                </Typography>
                <Typography variant="body1" component="p">
                  DECCAAN DNA ID: {deccaaanDna.id}
                </Typography>
                <Typography variant="body1" component="p">
                  DNA Data: {deccaaanDna.data}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" component="p">
                No DECCAAN DNA data available.
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handlePrint}>
              Print
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PrintDECCAANDNACard;
