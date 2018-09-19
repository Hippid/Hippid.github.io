// MenuBar.js
import React from 'react';
import PropTypes from 'prop-types';
import './MenuBar.css';

const MenuItem = (props) => {
  const { name, menuName, handleMenuClick } = props;
  const hrefName = `#${name}`;
  let cssClass = 'MenuItem';
  if (menuName === name) {
    cssClass = `${cssClass} SelectedMenu`;
  }
  const idName = `menu_${name}`;
  // const actualHandleMenuClick = (handleMenuClick(name));
  return (<li><a href={hrefName} id={idName} className={cssClass} onClick={handleMenuClick}>{name}</a></li>);
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

const MenuBar = (props) => {
  const {
    defaultMenu, menuItems, selectedMenu, handleMenuClick,
  } = props;
  // Default selected menu is Home.
  let menuName = defaultMenu;
  if (selectedMenu && (menuItems.indexOf(selectedMenu) > -1)) {
    menuName = props.selectedMenu;
  }

  return (
    <div className="menu">
      <ul>
        {
          menuItems.map(object => <MenuItem key={object} name={object} menuName={menuName} handleMenuClick={handleMenuClick} />)
        }
      </ul>
    </div>);
};

MenuBar.propTypes = {
  defaultMenu: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedMenu: PropTypes.string,
  handleMenuClick: PropTypes.func.isRequired,
};

MenuBar.defaultProps = {
  selectedMenu: '',
};

export default MenuBar;
