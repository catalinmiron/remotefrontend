import React from 'react';
import './footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;

    this.state = {
      sticky: location && location.pathname === '/',
    };
  }

  render() {
    return (
      <footer className={this.state.sticky ? 'footer sticky' : 'footer'}>
        <a href="mailto:hi@frontendremotejobs.com?subject=I'd like to post a job on frontendremotejobs.com">
          Post a Job: $15 / month!
        </a>
      </footer>
    );
  }
}

export default Footer;
