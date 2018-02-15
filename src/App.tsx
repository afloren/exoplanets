import * as React from 'react';
import React3 from 'react-three-renderer';
import { Euler, Vector3 } from 'three';
import './App.css';

const logo = require('./logo.svg');

interface SimpleProps {
  width: number;
  height: number;
}

interface SimpleState {
  cubeRotation: Euler;
}

class App extends React.Component<SimpleProps, SimpleState> {
  private cameraPosition: Vector3;

  constructor(props: SimpleProps, context: never) {
    super(props, context);
 
    this.cameraPosition = new Vector3(0, 0, 5);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.state = {
      cubeRotation: new Euler(
        5,
        10,
        15,
      ),
    };
  }

  public onAnimate = () => {
    this.setState({
      cubeRotation: new Euler(
        this.state.cubeRotation.x + 0.1,
        this.state.cubeRotation.y + 0.1,
        0
      ),
    });
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>        
        <React3
          mainCamera="camera" // this points to the perspectiveCamera below
          width={width}
          height={height}
          onAnimate={this.onAnimate}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}

              position={this.cameraPosition}
            />
            <ambientLight 
                color={0xffffff}
                intensity={0.2}
            />
            <pointLight
                position={new Vector3(5, 5, 2)}
                color={0xffffff}
                decay={2.0}
                intensity={1.0}
            />
            <mesh
              rotation={this.state.cubeRotation}
            >
              <sphereGeometry 
                radius={1.0}
                widthSegments={10}
                heightSegments={10}
              />
              <meshStandardMaterial
                color={0x00ff00}
              />
            </mesh>
          </scene>
        </React3>
      </div>
    );
  }
}

export default App;
