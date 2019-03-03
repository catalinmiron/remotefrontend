import React, { Component } from 'react';
import styles from './checkout.module.scss';
import uuid from 'uuid';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      message: ''
    };

    this.openStripeCheckout = this.openStripeCheckout.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
  }

  componentDidMount() {
    this.stripeHandler = window.StripeCheckout.configure({
      // You’ll need to add your own Stripe public key to the `checkout.js` file.
      // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
      key: 'pk_test_okjVYrTDsEVOKIlfdR3RhS1Z',
      closed: () => {
        this.setState({
          loading: false
        });
      }
    });
  }

  showError(element) {
    element.classList.add('error');
  }

  handleCheckoutClick(e) {
    if (this.props.isValid()) {
      this.openStripeCheckout(e);
    } else {
      this.setState({
        message:
          'The form has errors. Please make sure to fill in all required fields and try again.'
      });
      const form = this.props.form.current;
      const inputs = form.querySelectorAll('input, textarea');

      // Trigger validation on each form field.
      for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        const isValid = element.checkValidity();
        if (!isValid) {
          element.classList.add('error');
        } else {
          element.classList.remove('error');
        }
      }
    }
  }

  openStripeCheckout(event) {
    // const { lambdaEndpoint } = this.props;
    this.setState({ loading: true });
    this.stripeHandler.open({
      name: 'Front End Remote Jobs',
      amount: this.props.amount,
      description: 'Job listing',
      zipCode: true,
      token: (token) => {
        fetch('/.netlify/functions/job-purchase.js', {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            token,
            amount: this.props.amount,
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
              // this.resetButton();
              this.setState({
                paymentMessage:
                  'Uh oh, something went wrong 😬. Please try again, or send an email to hi@frontendremotejobs.com for support.'
              });
            }

            return res;
          })
          .catch((error) => {
            console.error('Error:', error);
            this.setState({
              paymentMessage:
                'Uh oh, something went wrong. Please try again, or send an email to hi@frontendremotejobs.com for support.'
            });
          });
      }
    });
  }
  render() {
    const { buttonText } = this.props;
    const { loading, message } = this.state;
    return (
      <>
        <button
          onClick={this.handleCheckoutClick}
          type="submit"
          className={styles.submit}
          disabled={loading}
        >
          {!loading ? buttonText : 'Loading...'}
        </button>
        {message && <p>{message}</p>}
      </>
    );
  }
}
