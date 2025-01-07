exports.handler = async function(event, context) {
  // Log the callback data
  console.log('Payment callback received:', event.body);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'success' })
  };
};
