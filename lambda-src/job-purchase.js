require('dotenv').config();
// https://macarthur.me/posts/building-a-lambda-function-with-netlify/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Change to only allow requests from frontendremotejobs.com
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = function(event, context, callback) {
  // If it's not a POST or there is no body, abort.
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 403,
      headers,
      body: 'Access denied.'
    });

    return;
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);

  // Make sure we have all required data. Otherwise, escape.
  if (!data.token || !data.amount || !data.idempotency_key) {
    callback(null, {
      statusCode: 422,
      headers,
      body: JSON.stringify({ status: 'missing-information' })
    });

    return;
  }

  let status;
  let statusCode = 200;

  (async () => {
    const charge = await stripe.charges.create(
      {
        amount: data.amount,
        currency: 'usd',
        source: data.token,
        receipt_email: data.email
      },
      (err, charge) => {
        console.log(err);
        if (err !== null) {
          statusCode = (err && err.statusCode) || 422;
          status = err.message;
        }
        else {
          status =
            charge === null || charge.status !== 'active'
              ? 'failed'
              : charge.status;
        }

        callback(null, {
          statusCode,
          headers,
          body: JSON.stringify({ status })
        });
      }
    );

    return;
  })();
};
