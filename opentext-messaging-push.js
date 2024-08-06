const axios = require('axios');

const apiEndpoint = 'https://api.us.cloudmessaging.opentext.com/mra/v1/utils/parser';

const opentextMessagingPush = {
  /**
   * Submit a file to a parser
   * @param {object} submitToParserRequest
   * @returns {Promise<object>}
   */
  submitToParser: async (submitToParserRequest) => {
    try {
      const response = await axios.post(apiEndpoint, submitToParserRequest, {
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
};

module.exports = opentextMessagingPush;
