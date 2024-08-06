import axios from 'axios';

class MedicalDetailsService {
  async getMedicalDetails(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/medical-details/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getMedicalHistory(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/medical-history/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getMedications(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/medications/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAllergies(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/allergies/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getImmunizations(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/immunizations/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getLabResults(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/lab-results/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getRadiologyResults(patientId) {
    try {
      const response = await axios.get(`https://your-mongodb-api-url.com/api/v1/radiology-results/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getDECCAANDNADetails(patientId) {
    try {
      const response = await axios.get(`https://your-opentext-content-storage-api-url.com/api/v1/deccaaan-dna/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default MedicalDetailsService;
