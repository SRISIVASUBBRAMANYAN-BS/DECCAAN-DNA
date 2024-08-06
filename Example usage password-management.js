const passwordManagement = require('./password-management');

const passwordResetRequestInfo = {
  accountEmail: 'user@example.com',
  accountId: '1234567890',
  serviceCode: 'my-service-code',
};

passwordManagement.initiatePasswordReset(passwordResetRequestInfo)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

const passwordUpdateRequestInfo = {
  accountId: '1234567890',
  password: 'new-password',
  trackerId: 'tracker-id-from-initiate-password-reset',
};

passwordManagement.resetPassword(passwordUpdateRequestInfo)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

const id = 'password-reset-request-id';
passwordManagement.getPasswordResetRequestDetails(id)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
