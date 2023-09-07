import React from 'react';
import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About the mini <span>Blog</span>{' '}
        <p>
          This project is a blog create with React in front-end and firebase in
          back-end
        </p>
        <Link to='/posts/create' className='btn'>
          Create a new Post
        </Link>
      </h2>
    </div>
  );
};

export default About;
