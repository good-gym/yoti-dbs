const Yoti = require('yoti-node-sdk');
const Path = require('path');
const Fs = require('fs');

const sdkId = "58ae8dd7-d915-4fe9-9b92-63ebf151306b";
const yotiPem = Fs.readFileSync(Path.join(__dirname, '../keys/good-gym-access-security.pem'));
const yotiClient = new Yoti(sdkId, yotiPem);

const users = {
  'fAUhmIxQAMxKd7pQ0mACongkiz3OpS1oqLfHpamEN7QT0CCuBy4DCsgzpUn9g87G': {
    name: 'John Whiles',
    status: true
  },
  'pChUdc2kq71VAEpKindWj1/ef6G3C+ih/8kr3Y0/JBMbHFiGhhYO/6FqUdjZXquN': {
    name: 'Steve Hopkinson',
    status: false
  }
};

const confirmationHandler = (request, reply) => {
  const token = request.query.token;
  if (!token) {
    reply('no token!');
    return;
  }
  const promise = yotiClient.getActivityDetails(token);
  promise.then((activityDetails) => {
    const userId = activityDetails.getUserId();
    const profile = activityDetails.getUserProfile();
    const { selfie, givenNames, familyName } = profile;
    console.log(selfie);
    reply.view('result', { confirmed: users[userId].status, selfie, givenNames, familyName });
  });
};

const confirmationRoute = {
  method: 'GET',
  path: '/get-started',
  handler: confirmationHandler
};

module.exports = {
  confirmationRoute,
  confirmationHandler
}
