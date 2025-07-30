const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const { sign } = event.queryStringParameters;
        
        const response = await fetch(
        `https://aztro.sameerkumar.website/?sign=${sign}&day=today`, 
        { method: 'POST' }
        );
        
        const data = await response.json();
        
        return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
        };
    } catch (error) {
        return {
        statusCode: 500,
        body: JSON.stringify({ error: "Horoscope unavailable" }),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
        };
    }
};