const fetch = require('node-fetch');

exports.handler = async (event) => {
  // 1. Get the zodiac sign from query params
    const { sign } = event.queryStringParameters;
    
    // 2. Fetch from Aztro API
    const response = await fetch(
        `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
        { method: 'POST' }
    );
    
    // 3. Return data with CORS headers
    return {
        statusCode: 200,
        body: JSON.stringify(await response.json()),
        headers: {
        'Access-Control-Allow-Origin': '*'
        }
    };
};