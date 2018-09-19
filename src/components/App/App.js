import React, { Component } from 'react';

import HeaderBox from './HeaderBox';
import ContentBox from './ContentBox';

import './App.css';

class App extends Component {
  constructor() {
    super();
    // Top level App state only holds the selected menu.
    // Headerbox sets it using the handleMenuClick.
    // ContentBox renders based on value of selectedMenu in the state.
    // Note 1: This is a decoupled process, both components don't know about eachother.
    // Note 2: setState is Async by nature, checkout 'checkItem' function in JobBox if you want use state change directly after setting it.
    this.state = {
      selectedMenu: '',
      selectedTheme: 'dark',
    };

    // this.darkClick = this.darkClick.bind(this);
    // this.lightClick = this.lightClick.bind(this);
    // this.solarClick = this.solarClick.bind(this);
  }

  componentDidMount() {
    this.setTheme();
  }

  componentWillUnmount() {
    this.clearBodyClass();
  }

  setTheme() {
    const { selectedTheme } = this.state;
    console.log(`Selected Theme ${selectedTheme}`);
    this.clearBodyClass();
    document.body.classList.add(selectedTheme);
  }

  handleMenuClick = (event) => {
    const name = event.currentTarget.text;
    if (!name) {
      this.setState({ error: 'Invalid menu id.' });
      return;
    }

    const newState = { ...this.state };
    newState.selectedMenu = name;
    this.setState(newState);
  }

  darkClick = () => {
    const newState = { ...this.state };
    newState.selectedTheme = 'dark';
    this.setState(newState, this.setTheme);
  }

  lightClick = () => {
    const newState = { ...this.state };
    newState.selectedTheme = 'light';
    this.setState(newState, this.setTheme);
  }

  solarClick = () => {
    const newState = { ...this.state };
    newState.selectedTheme = 'solarized';
    this.setState(newState, this.setTheme);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["clearBodyClass"] }] */
  clearBodyClass() {
    while (document.body.classList.length > 0) {
      document.body.classList.remove(document.body.classList.item(0));
    }
  }

  render() {
    const { selectedMenu, selectedTheme } = this.state;
    return (
      <div className="App">
        <HeaderBox selectedMenu={selectedMenu} handleMenuClick={this.handleMenuClick} darkClick={this.darkClick} lightClick={this.lightClick} solarClick={this.solarClick} selectedTheme={selectedTheme} />
        <div className="App-content">
          <ContentBox selectedMenu={selectedMenu} />
        </div>
      </div>
    );
  }
}

export default App;
