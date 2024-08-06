const axios = require('axios');

const apiEndpoint = 'https://apigrid.opentext.com/PasswordManagementServices/v1';

const passwordManagement = {
  /**
   * Initiate password reset request
   * @param {object} passwordResetRequestInfo
   * @returns {Promise<object>}
   */
  initiatePasswordReset: async (passwordResetRequestInfo) => {
    try {
      const response = await axios.post(`${apiEndpoint}/accounts/credentials`, passwordResetRequestInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password
   * @param {object} passwordUpdateRequestInfo
   * @returns {Promise<object>}
   */
  resetPassword: async (passwordUpdateRequestInfo) => {
    try {
      const response = await axios.put(`${apiEndpoint}/accounts/credentials`, passwordUpdateRequestInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get password reset request details by ID
   * @param {string} id
   * @returns {Promise<object>}
   */
  getPasswordResetRequestDetails: async (id) => {
    try {
      const response = await axios.get(`${apiEndpoint}/accounts/credentials/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = passwordManagement;
