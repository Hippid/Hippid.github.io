// ContentBox.js
import React from 'react';
import PropTypes from 'prop-types';

import Home from '../Home/Home';
import JobBox from '../Jobs/JobBox';
import CommentBox from '../Comments/CommentBox';
import TvShowBox from '../TvShows/TvShowBox';
// import MenuBs from '../MenuBs/MenuBs';

const ContentBox = (props) => {
  const { selectedMenu } = props;
  if (selectedMenu) {
    switch (props.selectedMenu) {
      case 'Jobs':
        return (<JobBox />);
      case 'Comments':
        return (<CommentBox />);
      case 'Shows':
        return (<TvShowBox />);
      default:
        break;
    }
  }

  return (<Home />);
};

ContentBox.propTypes = {
  selectedMenu: PropTypes.string.isRequired,
};

export default ContentBox;
