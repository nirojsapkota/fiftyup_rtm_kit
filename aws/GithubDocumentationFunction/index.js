const AWS = require('aws-sdk');
const client = new AWS.SecretsManager();
const secretName = 'github-access-token';

const makeRequest = async (triggerType, triggerId, bucket, secret) => {
  var request = require('request');
  var headers = {
    Accept: 'application/json',
    Authorization: `token ${secret}`,
    'Content-Type': 'application/json',
    'User-Agent': 'obs-integrations',
  };
  var prOptions = {
    method: 'GET',
    url: 'https://api.github.com/repos/OBSAU/rtm-kit/pulls',
    qs: { head: `OBSAU:${triggerId}` },
    headers: headers,
    json: true,
  };

  await request(prOptions, async function(error, response, body) {
    if (error) {
      console.log(`Something went wrong when searching for the pull request`);
      throw new Error(error);
    }

    if (body.length > 0) {
      console.log(`Pull request ${body[0].number} found`);
      var postOptions = {
        method: 'POST',
        url: `https://api.github.com/repos/OBSAU/rtm-kit/issues/${
          body[0].number
        }/comments`,
        headers: headers,
        json: true,
        body: {
          body: `:memo: Your documentation is ready! Check it out [here](http://${bucket}.s3-website-ap-southeast-2.amazonaws.com/branch/${triggerId})`,
        },
      };
      await request(postOptions, async function(error, response, body) {
        if (error) throw new Error('err', error);

        console.log('Github notified');
        return body;
      });
    } else {
      console.log(`Pull request could not be found`);
    }
  });
};

exports.handler = async (event, _, callback) => {
  let triggerId;
  let triggerType;
  if (event.codebuild_trigger.startsWith('branch')) {
    triggerType = 'branch';
    triggerId = event.codebuild_trigger.replace(/branch\//g, '');
  } else {
    triggerType = 'pr';
    triggerId = event.codebuild_trigger.replace(/pr\//g, '');
  }

  console.log(`Github trigger event: type - ${triggerType}, id - ${triggerId}`);

  return client
    .getSecretValue({ SecretId: secretName })
    .promise()
    .then(
      async function(data) {
        try {
          const secret = data.SecretString;
          console.log(`Github access token retrieved`);
          const res = await makeRequest(
            triggerType,
            triggerId,
            event.bucket,
            secret
          );
          callback(null, res);
        } catch (err) {
          console.log(`Something went wrong when notifying Github`);
          callback(err);
        }
      },
      async function(err) {
        console.log(`Github access token could not be retrieved`);
        callback(err);
      }
    );
};
