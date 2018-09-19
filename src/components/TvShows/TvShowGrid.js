import React from 'react';

import TvShow from './TvShow';

const TvShowGrid = (props) => {
  /* eslint react/prop-types: 0 */
  const { shows } = props;
  if (shows) {
    console.log('TvShowGrid Shows');
    console.log(shows);
    return (
      <div className="TvShowGrid">
        {shows.map(show => (<TvShow key={show.show.id} show={show} />))}
      </div>);
  }
  return (<div />);
};

export default TvShowGrid;
