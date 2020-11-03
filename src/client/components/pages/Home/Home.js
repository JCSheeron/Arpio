import React, { Component } from 'react';

// styles
import styles from './Home.css';

const Home = (props) => {
  return (
    <main>
      {/************* About/ Profile ************/}
      <header>
        <div className={styles['content-wrap']}>
          <h1>Your Name</h1>
          <h2>Job title or tagline</h2>

          <p>
            Add your profile copy here. Add more paragraphs or links as needed.
            Here is some dummy text: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent bibendum, diam ut gravida efficitur, risus
            neque scelerisque erat, ut rhoncus erat odio ac justo. Nunc
            scelerisque vestibulum augue, sit amet hendrerit ante.
          </p>
          <p>Add another paragraph if needed.</p>
        </div>
      </header>

      {/************* Projects ************/}
      <section className={styles.projects}>
        <div className={styles['content-wrap']}>
          <h2>Featured Projects</h2>
          <p>
            View selected projects below. More information can be found at{' '}
            <a href='http://christinatruong.com'>christinatruong.com</a>.
          </p>

          <section>
            <h3>Project Name</h3>
            <img src='/img/sm.jpg' alt='Stack O Books' />
            <p>
              Summary or description of the project and/or your role in it. Add
              as many paragraphs as you need.
            </p>
            <a className={styles.btn} href='#' target='_blank'>
              View project / case study
            </a>
          </section>
        </div>
      </section>

      {/************* Work Experience ************/}
      <section className={styles.workExperience}>
        <div className={styles['content-wrap']}>
          <h2>Work Experience</h2>
          <p>
            Optional paragraph for work experience summary. Not a part of the
            job details. Delete if not being used.
          </p>

          <section>
            <h3>Job title</h3>
            <p>Company Name</p>
            <p>Date at job</p>
            <p>Job summary goes here. Add as many paragraphs as you need.</p>
            <p>Optional list:</p>
            <ul>
              <li>Delete this list if you don't need it.</li>
              <li>Created...</li>
              <li>Lead...</li>
              <li>Responsible for...</li>
            </ul>
          </section>
        </div>
      </section>

      {/************* Education ************/}
      <section className={styles.education}>
        <div className={styles['content-wrap']}>
          <h2>Education</h2>

          <section>
            <h3>School name - City</h3>
            <p>Designation received or program name, year attended</p>
            <p>Summary or accomplishments.</p>
          </section>
        </div>
      </section>

      <footer>
        <div className={styles['content-wrap']}>
          <h2>Let's Keep in Touch!</h2>

          <ul>
            <li>
              <a href='mailto:email@example.com'>email@example.com</a>
            </li>
            <li>
              <a href='http://yourwebsite.com' target='_blank'>
                yourwebsite.com
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Twitter
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                LinkedIn
              </a>
            </li>
            <li>
              <a href='#' target='_blank'>
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default Home;
