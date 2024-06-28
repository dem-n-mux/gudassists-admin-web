const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters, body, headers, httpMethod } = event;
  const url = `https://control.msg91.com${path.replace('/api', '')}`;

  const response = await fetch(url, {
    method: httpMethod,
    headers: {
      'Content-Type': headers['content-type'],
      'authkey': headers['authkey'],
      'Accept': headers['accept'],
    },
    body: httpMethod === 'POST' ? body : null,
  });

  const responseBody = await response.text();

  return {
    statusCode: response.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
    body: responseBody,
  };
};
