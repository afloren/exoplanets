import * as React from 'react';
import { createUnit } from 'mathjs';
import './App.css';
import Scene from './Scene';

const logo = require('./logo.svg');

interface SimpleProps {
  
}

interface SimpleState {
  
}

class App extends React.Component<SimpleProps, SimpleState> {
  constructor(props: SimpleProps, context: never) {
    super(props, context);
    createUnit('au', '149597870700 meters');
    createUnit('rsun', '695700 kilometers');
    createUnit('rjupiter', '69911 kilometers');
    createUnit('mjupiter', '1898200000000000000000000000 kilograms');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the exoplanet visualizer!</h1>
        </header>
        <p className="App-intro">
          To get started, please select an exoplanet from <a href="http://www.exoplanets.org">here</a>.
        </p>        
        <Scene width={1024} height={768} />
      </div>
    );
  }
}

export default App;
