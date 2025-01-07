const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Get access token
    const tokenResponse = await axios.post('https://pay.pesapal.com/v3/api/Auth/RequestToken', {
      consumer_key: 'wpTsAz1t4B4zxBSv+Xt3EvSXLdMVzvqk',
      consumer_secret: 'aFZYFhUuKJ2LAlZnxhu30sMbdkc='
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const token = tokenResponse.data.token;

    // Submit order request
    const orderResponse = await axios.post('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest', {
      id: `ORDER_${Date.now()}`,
      currency: 'KES',
      amount: 950.00,
      description: 'Test Payment',
      callback_url: 'https://canadian-visa-payment.netlify.app/.netlify/functions/callback',
      notification_id: 'cfc9458f-552f-492b-8c0b-dc4ff18883af',
      billing_address: {
        email_address: 'john.doe@example.com',
        phone_number: '0712345678',
        first_name: 'John',
        last_name: 'Doe'
      }
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(orderResponse.data)
    };
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment' })
    };
  }
};
