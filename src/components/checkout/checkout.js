import React, { Component } from 'react';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false
    };
  }

  componentDidMount() {
    this.stripeHandler = window.StripeCheckout.configure({
      // You’ll need to add your own Stripe public key to the `checkout.js` file.
      // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
      key: 'pk_test_okjVYrTDsEVOKIlfdR3RhS1Z',
      closed: () => {
        this.resetButton();
      }
    });
  }

  openStripeCheckout(event) {
    // const { lambdaEndpoint } = this.props;
    event.preventDefault();
    this.setState({ disabled: true, buttonText: 'Loading...' });
    this.stripeHandler.open({
      name: 'FE Remote Job Alerts',
      amount: amount,
      description: 'Subscription for instant job alerts',
      zipCode: true,
      token: (token) => {
        fetch(lambdaEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            token,
            amount,
            idempotency_key: uuid()
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then((res) => {
            console.log('Transaction processed successfully');
            console.log(res);

            if (res.status === 200) {
              this.setState({
                paymentMessage:
                  '🙌 Thanks for signing up! Go check your ✉️ email for more details'
              });
            } else {
              this.resetButton();
              this.setState({
                paymentMessage:
                  'Uh oh, something went wrong 😬. Please try again, or send an email to hi@frontendremotejobs.com for support.'
              });
            }

            return res;
          })
          .catch((error) => {
            console.error('Error:', error);
            this.resetButton();
            this.setState({
              paymentMessage:
                'Uh oh, something went wrong. Please try again, or send an email to hi@frontendremotejobs.com for support.'
            });
          });
      }
    });
  }
  render() {
    const { buttonText, amount } = this.props;
    return <button>{buttonText}</button>;
  }
}
