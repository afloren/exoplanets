import * as React from 'react';
import { createUnit } from 'mathjs';
import './App.css';
import Scene from './components/Scene';

interface SimpleProps {
  
}

interface SimpleState {
  width: number;
  height: number;
}

class App extends React.Component<SimpleProps, SimpleState> {
  constructor(props: SimpleProps, context: never) {
    super(props, context);
    createUnit('au', '149597870700 meters');
    createUnit('rsun', '695700 kilometers');
    createUnit('rjupiter', '69911 kilometers');
    createUnit('mjupiter', '1898200000000000000000000000 kilograms');
    this.state = { width: window.innerWidth, height: window.innerHeight };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div className="App">  
        <Scene width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default App;
