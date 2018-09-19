import React from 'react';

/* eslint react/prop-types: 0 */
const TvShow = ({ show }) => (
  <div className="TvShow">
    <h3>{show.show.name}</h3>
    <img src={show.show.image.original} alt="" />
  </div>);

export default TvShow;
