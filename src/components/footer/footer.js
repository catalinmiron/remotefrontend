import React from 'react';
import styles from './footer.module.scss';

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
      <div className={this.state.sticky ? styles.sticky : ''}>
        <footer className={styles.footer}>
          <a href="mailto:hi@frontendremotejobs.com?subject=I'd like to post a job on frontendremotejobs.com">
            Post a Job: $15 / month!
          </a>
        </footer>
      </div>
    );
  }
}

export default Footer;
