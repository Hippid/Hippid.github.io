import React from 'react';
import Login from '../Login/Login';
import './Home.css';

const Home = () => (
  <div className="home">
    <h1>Welcome</h1>
    <article>
      <div className="articleSection">
        <p>This is the singe page React playground of Hippid.</p>
        <h2 id="getting-started">
          <a className="anchorjs-link" href="#getting-started" aria-label="Anchor">&nbsp;</a>
          Getting Started
        </h2>
        <p>The Jobs demo is build with MERN (MongoDB Express React Node.JS) stack combined with Python.</p>
        <div>
          Python is used to scrape multiple job sites asynchronously and writes the results to the MongoDB.
          <br />
          Express is used to host the API that returns the scraped data to React.
          <br />
          Node.Js starts the react frontend and express backend of the application.
          <br />
          The frontend is using the new CSS Grid to allow scalebility of the table.
          <br />
          It holds over 9000 records and uses a combination of direct and indirect filtering mechanisms.
          <br />
          Note: All data should be considered outdated, since the spiders for scraping are started manually to not overload jobsites with continuous requests.
          <br />
          <br />
          The Comments demo shows how a react application can be used to communicate near realtime.
          <br />
          <br />
          All update and delete features are disabled for anonymous users.
          <br />
          E-mail&nbsp;
          <a href="mailto:react@hippid.com">react@hippid.com</a>
          &nbsp;to schedule a demo.
          <br />
        </div>
        <Login />
        <br />
      </div>
    </article>
  </div>);

export default Home;
