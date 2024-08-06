const axios = require('axios');

const apiEndpoint = 'https://css.us.api.opentext.com/v3';

const contentStorageService = {
  /**
   * Create a new file
   * @param {object} filePostRequest
   * @returns {Promise<object>}
   */
  createFile: async (filePostRequest) => {
    try {
      const response = await axios.post(`${apiEndpoint}/files`, filePostRequest, {
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
   * Upload a file part
   * @param {string} fileId
   * @param {integer} partId
   * @param {object} filePartRequest
   * @returns {Promise<object>}
   */
  uploadFilePart: async (fileId, partId, filePartRequest) => {
    try {
      const response = await axios.put(`${apiEndpoint}/files/${fileId}/parts/${partId}/content`, filePartRequest, {
        headers: {
          'Content-Type': 'application/octet-stream',
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
   * Get file metadata
   * @param {string} fileId
   * @returns {Promise<object>}
   */
  getFileMetadata: async (fileId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/files/${fileId}`, {
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
   * Download a file part
   * @param {string} fileId
   * @param {integer} partId
   * @returns {Promise<object>}
   */
  downloadFilePart: async (fileId, partId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/files/${fileId}/parts/${partId}/content`, {
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
   * Download a file as a single stream
   * @param {string} fileId
   * @returns {Promise<object>}
   */
  downloadFileStream: async (fileId) => {
    try {
      const response = await axios.get(`${apiEndpoint}/files/${fileId}/stream`, {
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

module.exports = contentStorageService;
