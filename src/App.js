import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './components/chat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            We deployed to Heroku!
          </p>
          <Chat />
        </header>
      </div>
    );
  }
}

export default App;
