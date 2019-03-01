import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import classnames from 'classnames';

import styles from './post-a-job.module.scss';

class PostAJob extends React.Component {
  constructor() {
    super();
    this.state = {
      cost: 25,
      form: {
        jobTitle: '',
        company: '',
        url: '',
        teaser: '',
        salary: '',
        content: '',
        name: '',
        email: '',
        featured: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePromotionChange = this.handlePromotionChange.bind(this);
  }

  handleChange(e) {
    const field = e.currentTarget.id;
    const value = e.currentTarget.value;
    this.setState(({ form: prevForm }) => ({
      form: {
        ...prevForm,
        [field]: value
      }
    }));
  }

  handlePromotionChange(e) {
    const field = e.currentTarget.id;
    const checked = e.currentTarget.checked;
    const value = Number(e.currentTarget.value);
    const priceChange = checked ? value : value * -1;

    this.setState(({ form: prevForm, cost: prevCost }) => ({
      form: {
        ...prevForm,
        [field]: checked
      },
      cost: prevCost + priceChange
    }));
  }

  render() {
    return (
      <>
        <Helmet
          title={'Post a job | Front End Remote Jobs'}
          meta={[
            {
              name: 'description',
              description: 'Post a job on Front End Remote Jobs.'
            }
          ]}
        />
        <div className={styles.container}>
          <h1>Post a job on Front End Remote Jobs</h1>
          <p>
            Front end remote jobs reaches the <em>best</em> front end web
            developers who are only looking for remote work.
          </p>
          <p>
            By posting a job here, you get your listing directly in front of the
            developers who want to see it most.
          </p>
          <p>
            We get 1000+ pageviews a month (and growing fast!) and each listing
            is sent to our weekly newsletter as well (50+ subscribers).
          </p>
          <p>
            <strong>Job listings last for 30 days, and start at $25.</strong>
          </p>
          <p>
            To get started, fill out the form below, preview your listing, and
            submit! Most job listings are live within 24 hours.
          </p>
          <form action="" className={styles.postJobForm}>
            <fieldset className={styles.fieldset}>
              <legend>🛠 Job Information </legend>
              <div className={styles.titleSection}>
                <div>
                  <label className={styles.label} htmlFor="jobTitle">
                    Job Title
                  </label>
                  <input
                    className={styles.input}
                    onChange={this.handleChange}
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    required
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="company">
                    Company Name
                  </label>
                  <input
                    className={styles.input}
                    onChange={this.handleChange}
                    type="text"
                    name="company"
                    id="company"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={styles.label} htmlFor="url">
                  Application URL
                </label>
                <span className={styles.helpText}>
                  This can be a link to your job application or a mailto link.
                </span>
                <input
                  className={styles.input}
                  onChange={this.handleChange}
                  type="text"
                  name="url"
                  id="url"
                  required
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="teaser">
                  Teaser
                </label>
                <span className={styles.helpText}>
                  This appears on the home page and in search results. Make it
                  catchy!
                </span>
                <textarea
                  onChange={this.handleChange}
                  required
                  name="teaser"
                  id="teaser"
                  rows="2"
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="salary">
                  Salary Info
                </label>
                <input
                  className={styles.input}
                  onChange={this.handleChange}
                  type="text"
                  name="salary"
                  id="salary"
                />
              </div>
              <div>
                <label className={styles.label} htmlFor="content">
                  Content
                </label>
                <span className={styles.helpText}>
                  The main content of your listing. Be sure to include any
                  specific instructions on how to apply.
                </span>
                <textarea
                  onChange={this.handleChange}
                  required
                  name="content"
                  id="content"
                  rows="20"
                />
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend>👋 Your contact info</legend>
              <div className={styles.titleSection}>
                <div>
                  <label className={styles.label} htmlFor="name">
                    Your name
                  </label>
                  <input
                    onChange={this.handleChange}
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                </div>
                <div>
                  <label className={styles.label} htmlFor="email">
                    Your email address
                  </label>
                  <input
                    onChange={this.handleChange}
                    className={styles.input}
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className={styles.fieldset}>
              <legend> 📣 Promotion</legend>
              <div
                className={classnames(styles.promotionCheckboxGroup, {
                  [styles.promotionSelected]: this.state.form.featured
                })}
              >
                <label className={styles.label} htmlFor="featured">
                  <input
                    className={styles.input}
                    type="checkbox"
                    name="featured"
                    id="featured"
                    aria-describedby="featured-post-desc"
                    onChange={this.handlePromotionChange}
                    value={25}
                  />
                  ✨Featured Post ✨(adds $25)
                </label>
                <div>
                  <ul>
                    <li>📌 pinned to the top of the homepage</li>
                    <li>📝 displayed next to blog posts</li>
                    <li>
                      ✉️ featured at the top of the newsletter for 4 weeks
                    </li>
                  </ul>
                </div>
              </div>
            </fieldset>
            <button className={styles.submit} type="submit">
              Pay ${this.state.cost} and Submit!
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default PostAJob;
