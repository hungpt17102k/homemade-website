import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import '../css/index-custom.css'; // Import your CSS here
import { Analytics } from '@vercel/analytics/react';

// Import capsule for feature
import logo from './Projects/Image/HomePage/logo.png'
import capsule1 from './Projects/Image/HomePage/Kickstarter.png';
import capsule2 from './Projects/Image/HomePage/Seeking_Cat_Cover.png';
import capsule3 from './Projects/Image/HomePage/Unity_Doc.png';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <Analytics />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            Studio's Document
          </Link>
        </div>
      </div>
    </header>
  );
}

const accessLinkOnClick = (link: string) => {
  window.location.href = link;
}

function HomepageHeaderNew() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="HomeMade Logo" className="logo-image" />
          <h1>HomeMade Studio</h1>
        </div>
        {/* <h1>HomeMade Studio</h1> */}
        <p>This page where you can see our projects and documents</p>
      </header>

      <section className="features">
        <div className="feature-item">
          <img src={capsule1} alt="Feature 1" className="feature-image" />
          <div className="feature-description">
            <h2>Kick Starter</h2>
            <p>Help us by backing this project. 🥰</p>
            <button 
              className="btn-dark" 
              onClick = {() => accessLinkOnClick('/project')}>
              Back on Kickstarter
            </button>
          </div>
        </div>

        <div className="feature-item">
          <img src={capsule2} alt="Feature 2" className="feature-image" />
          <div className="feature-description">
            <h2>Studio's Projects</h2>
            <p>Go and visit our games. 🙌</p>
            <button 
              className="btn-dark" 
              onClick = {() => accessLinkOnClick('/project')}>
              See Projects
            </button>
          </div>
        </div>

        <div className="feature-item">
          <img src={capsule3} alt="Feature 3" className="feature-image" />
          <div className="feature-description">
            <h2>Documents</h2>
            <p>You guys can use my unity packages here. 📄</p>
            <button 
              className="btn-dark" 
              onClick = {() => accessLinkOnClick('/docs/introduction')}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/* <HomepageHeader /> */}
      <HomepageHeaderNew/>
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
