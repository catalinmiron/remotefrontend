import React from 'react';
import styles from './banner.module.scss';

class Banner extends React.Component {
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
        <div className={styles.banner}>
          <a href="mailto:ben@frontendremotejobs.com?subject=I'd like to post a job on frontendremotejobs.com">
            Post a Job: $15 / month!
          </a>
        </div>
      </div>
    );
  }
}

export default Banner;
