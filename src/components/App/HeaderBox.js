// HeaderBox.js
import React from 'react';
import PropTypes from 'prop-types';

import MenuBar from '../Menu/MenuBar';
import MenuBs from '../MenuBs/MenuBs';

import logo from './logo.svg';

const menuItems = ['Home', 'Jobs', 'Comments', 'Shows'];

const HeaderBox = (props) => {
  const {
    handleMenuClick, selectedMenu, darkClick, lightClick, solarClick, selectedTheme,
  } = props;
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Hippid React App</h1>
      <MenuBar defaultMenu="Home" menuItems={menuItems} handleMenuClick={handleMenuClick} selectedMenu={selectedMenu} />
      <MenuBs darkClick={darkClick} lightClick={lightClick} solarClick={solarClick} selectedTheme={selectedTheme} />
    </header>);
};

HeaderBox.propTypes = {
  selectedMenu: PropTypes.string,
  handleMenuClick: PropTypes.func.isRequired,
  darkClick: PropTypes.func.isRequired,
  lightClick: PropTypes.func.isRequired,
  solarClick: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
};

HeaderBox.defaultProps = {
  selectedMenu: '',
};

export default HeaderBox;
