// MenuBarBs.js
import React from 'react';
import PropTypes from 'prop-types';
import './MenuBs.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default class MenuBs extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.toggleDd = this.toggleDd.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
    };

    this.darkClick = props.darkClick;
    this.lightClick = props.lightClick;

    this.solarClick = props.solarClick;
    // this.selectedTheme = props.selectedTheme;
  }

  onMouseEnter() {
    this.setState(() => ({ dropdownOpen: true }));
  }

  onMouseLeave() {
    this.setState(() => ({ dropdownOpen: false }));
  }

  onFocus() {
    this.setState(() => ({ dropdownOpen: true }));
  }

  toggleDd() {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen, dropdownOpen } = this.state;
    const { selectedTheme } = this.props;
    let navColor = 'light';
    let navBarClassName = 'navbar-light';
    let allClassName = 'bg-light';
    let navLight = true;
    let navDark = false;
    let topColor = '';
    if (selectedTheme) {
      switch (selectedTheme) {
        case 'dark':
          navColor = 'dark';
          navBarClassName = 'navbar-dark';
          allClassName = 'bg-dark';
          navDark = true;
          navLight = false;
          topColor = 'dark';
          break;
        case 'solarized':
          navColor = 'solar';
          navBarClassName = 'navbar-solar';
          allClassName = 'bg-solar';
          navDark = false;
          navLight = false;
          topColor = 'solarized';
          break;
        default:
          break;
      }
    }

    // navbar-light ml-auto
    const navClassName = `${navBarClassName} ml-auto`;
    navBarClassName = `${navClassName} ${allClassName} navbar-expand-sm`;
    const switchClassName = `${navColor} switch-theme`;
    const test = `${allClassName} has-dropdown`;
    const topBarV = `${topColor}`;
    return (
      <div className={topBarV} id="navigation" onMouseLeave={this.onMouseLeave}>
        <Navbar className={navBarClassName} color={navColor} expand="md" light={navLight} dark={navDark}>
          <NavbarBrand href="/">Hippid</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className={navClassName} navbar>
              <NavItem>
                <NavLink href="https://github.com/Hippid/ReactJsApp">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown isOpen={dropdownOpen} nav inNavbar className={test} onMouseOver={this.onMouseEnter} onFocus={this.onFocus} toggle={this.toggleDd}>
                <DropdownToggle nav caret className={switchClassName} aria-label="theme switcher" title="theme switcher" />
                <DropdownMenu right>
                  <DropdownItem className="toggle-light" onClick={this.lightClick}>Light</DropdownItem>
                  <DropdownItem className="toggle-dark" onClick={this.darkClick}>Dark</DropdownItem>
                  <DropdownItem className="toggle-solarized" onClick={this.solarClick}>Solarized</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>);
  }
}

MenuBs.propTypes = {
  darkClick: PropTypes.func.isRequired,
  lightClick: PropTypes.func.isRequired,
  solarClick: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
};
