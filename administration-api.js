const axios = require('axios');

const apiEndpoint = 'https://us.api.opentext.com/admin/api/v1';

const administrationApi = {
  /**
   * Get apps
   * @param {string} organizationId
   * @returns {Promise<object>}
   */
  getApps: async (organizationId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/organizations/${organizationId}/apps`, {
        headers: {
          'Content-Type': 'application/json',
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
   * Create app
   * @param {string} organizationId
   * @param {object} appRequest
   * @returns {Promise<object>}
   */
  createApp: async (organizationId, appRequest) => {
    try {
      const response = await axios.post(`${apiEndpoint}/organizations/${organizationId}/apps`, appRequest, {
        headers: {
          'Content-Type': 'application/json',
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
   * Get app
   * @param {string} organizationId
   * @param {string} appId
   * @returns {Promise<object>}
   */
  getApp: async (organizationId, appId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/organizations/${organizationId}/apps/${appId}`, {
        headers: {
          'Content-Type': 'application/json',
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
   * Update app
   * @param {string} organizationId
   * @param {string} appId
   * @param {object} appRequest
   * @returns {Promise<object>}
   */
  updateApp: async (organizationId, appId, appRequest) => {
    try {
      const response = await axios.put(`${apiEndpoint}/organizations/${organizationId}/apps/${appId}`, appRequest, {
        headers: {
          'Content-Type': 'application/json',
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
   * Delete app
   * @param {string} organizationId
   * @param {string} appId
   * @returns {Promise<object>}
   */
  deleteApp: async (organizationId, appId) => {
    try {
      const response = await axios.delete(`${apiEndpoint}/organizations/${organizationId}/apps/${appId}`, {
        headers: {
          'Content-Type': 'application/json',
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
};

module.exports = administrationApi;
