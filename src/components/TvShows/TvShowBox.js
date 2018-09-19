import React from 'react';
// Redux not yet used.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TvShowGrid from './TvShowGrid';

import { fetchTvShows } from '../../actions/index';

import './TvShowBox.css';

const TvShowBox = (props) => {
  /* eslint no-shadow: ["error", { "allow": ["fetchTvShows"] }] */
  /* eslint react/prop-types: 0 */
  const {
    fetchTvShows,
    isLoading,
    error,
    tvshows,
  } = props;

  return (
    <div className="TvShowBox">
      <div className="TvShowHeader">
        <button type="button" onClick={fetchTvShows}>Fetch shows</button>
      </div>
      {isLoading && <h1>Fetching data</h1>}
      {!isLoading && !error && <TvShowGrid shows={tvshows} />}
      {error && <h1>{error}</h1>}
    </div>
  );
};

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchTvShows,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TvShowBox);
