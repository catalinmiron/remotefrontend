import React from 'react';
import striptags from 'striptags';
import styles from './post-listing.module.scss';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { Link } from 'gatsby';
import classname from 'classnames';
import { useTech } from '../../useTech';

const title = (title, company) => (
  <h2>
    {title} <span className={styles.at}>at</span> {company}
  </h2>
);

const TagLinks = ({ tags }) =>
  tags.map((tag) => (
    <Link className={styles.tag} to={`/remote-${tag.slug}-developer-jobs`}>
      {tag.name}
    </Link>
  ));

const PostListing = ({ post }) => {
  const tech = useTech();
  let tags;

  if (post.technology) {
    tags = [];
    post.technology.forEach((id) => {
      const tag = tech.find((term) => term.wordpress_id === id);
      tags.push(tag);
    });
  }

  console.log({ tags });

  return (
    <article
      aria-label={`${post.title} at ${post.company}`}
      className={classname({
        [styles.posting]: true,
        [styles.featuredPost]: post.featured
      })}
      key={post.date + post.title}
    >
      <div className={styles.top}>
        {title(post.title, post.company)}
        {post.featured ? (
          <Link to={`/jobs/${post.slug}`} className={styles.featured}>
            Featured Job!
          </Link>
        ) : (
          <p className={styles.date}>{post.date}</p>
        )}
      </div>
      {tags && <TagLinks tags={tags} />}

      {post.snippet && (
        <div className={styles.snippet}>
          <p dangerouslySetInnerHTML={{ __html: striptags(post.snippet) }} />
        </div>
      )}
      <div className={styles.cta}>
        <OutboundLink className={styles.apply} href={post.path}>
          Apply Now
        </OutboundLink>
        <Link to={`/jobs/${post.slug}`}>Full Description</Link>
      </div>
    </article>
  );
};

PostListing.propTypes = {};

export default PostListing;
