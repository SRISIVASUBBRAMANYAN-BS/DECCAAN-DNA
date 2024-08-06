const axios = require('axios');

const apiEndpoint = 'https://api.us.cloudmessaging.opentext.com/mra/v1';

const opentextMessaging = {
  /**
   * Send SMS
   * @param {object} smsRequest
   * @returns {Promise<object>}
   */
  sendSms: async (smsRequest) => {
    try {
      const response = await axios.post(`${apiEndpoint}/outbound/sms`, smsRequest, {
        headers: {
          'Content-Type': 'application/json',
          'X-MRA-SubmitId': 'your-submit-id', // optional
        },
        auth: {
          username: 'your-username',
          password: 'your-password',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get SMS status
   * @param {string} jobId
   * @returns {Promise<object>}
   */
  getSmsStatus: async (jobId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/outbound/sms/status/${jobId}`, {
        headers: {
          'X-MRA-SubmitId': 'your-submit-id', // optional
        },
        auth: {
          username: 'your-username',
          password: 'your-password',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get status for multiple SMS jobs
   * @param {object} smsBatchStatusRequest
   * @returns {Promise<object>}
   */
  getSmsStatusBatch: async (smsBatchStatusRequest) => {
    try {
      const response = await axios.post(`${apiEndpoint}/outbound/sms/status`, smsBatchStatusRequest, {
        headers: {
          'X-MRA-SubmitId': 'your-submit-id', // optional
        },
        auth: {
          username: 'your-username',
          password: 'your-password',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Send email
   * @param {object} emailRequest
   * @returns {Promise<object>}
   */
  sendEmail: async (emailRequest) => {
    try {
      const response = await axios.post(`${apiEndpoint}/outbound/emails`, emailRequest, {
        headers: {
          'Content-Type': 'application/json',
          'X-MRA-SubmitId': 'your-submit-id', // optional
        },
        auth: {
          username: 'your-username',
          password: 'your-password',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get email status
   * @param {string} jobId
   * @returns {Promise<object>}
   */
  getEmailStatus: async (jobId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/outbound/emails/status/${jobId}`, {
        headers: {
          'X-MRA-SubmitId': 'your-submit-id', // optional
        },
        auth: {
          username: 'your-username',
          password: 'your-password',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get status for multiple email jobs
   * @param {object} emailBatchStatusRequest
   * @returns {Promise<object>}
   */
  getEmailStatusBatch: async (emailBatchStatusRequest) => {
    try
