require('dotenv').config();
// https://macarthur.me/posts/building-a-lambda-function-with-netlify/
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Change to only allow requests from frontendremotejobs.com
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function(event, context, callback) {
  'use strict';

  // If it's not a POST or there is no body, abort.
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 403,
      headers,
      body: 'Access denied.',
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
      body: JSON.stringify({ status: 'missing-information' }),
    });

    return;
  }

  let status;
  let statusCode = 200;

  (async function() {
    // Create a new customer.
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
            plan: 'plan_DyA0E5U97oTCZS', // test plan
            // plan: 'plan_Dy9tOuHFJugE6f',
          },
        ],
      },
      (err, subscription) => {
        if (err !== null) {
          statusCode = (err && err.statusCode) || 422;
          status = err.message;
        } else {
          status =
            subscription === null || subscription.status !== 'active'
              ? 'failed'
              : subscription.status;
        }

        callback(null, {
          statusCode,
          headers,
          body: JSON.stringify({ status }),
        });
      }
    );

    return;
  })();
};
