require('dotenv').config();
// https://macarthur.me/posts/building-a-lambda-function-with-netlify/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const statusCode = 200;
// Change to only allow requests from frontendremotejobs.com
const headers = {
  'Access-Control-Allow-Origin': `${process.env.HOME}`,
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: 'Let there be light!',
    });
  }

  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body);

  //-- Make sure we have all required data. Otherwise, escape.
  if (!data.token || !data.amount || !data.idempotency_key) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    });

    return;
  }

  (async function() {
    const customer = await stripe.customers.create({
      source: data.token.id,
      email: data.token.email,
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [
          {
            // plan: 'plan_DyA0E5U97oTCZS', // test plan
            plan: 'plan_Dy9tOuHFJugE6f',
          },
        ],
      },
      (err, subscription) => {
        if (err !== null) {
          statusCode = 400;
        }

        let status =
          subscription === null || subscription.status !== 'active'
            ? 'failed'
            : subscription.status;

        callback(null, {
          statusCode,
          headers,
          body: JSON.stringify({ status }),
        });
      }
    );
  })();
};
