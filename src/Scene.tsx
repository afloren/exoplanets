import * as React from 'react';
import { unit } from 'mathjs';
import React3 from 'react-three-renderer';
import { Vector3 } from 'three';
import Star from './Star';
import Planet from './Planet';
import PointCloud from './PointCloud';

interface SimpleProps {
    width: number;
    height: number;
}
  
interface SimpleState {
    time: number;
}
  
class Scene extends React.Component<SimpleProps, SimpleState> {
    constructor(props: SimpleProps, context: never) {
        super(props, context);
        this.state = {
            time: 0,
        };
    }

    public onAnimate = () => {
        this.setState((prevState, props) => ({
            time: prevState.time + 0.001,
        }));
    }
  
    render() {        
        return (        
            <React3
                width={this.props.width}
                height={this.props.height}
                onAnimate={this.onAnimate}
            >
                <viewport
                    x={0}
                    y={0}
                    width={this.props.width / 2}
                    height={this.props.height}
                    cameraName="planet-camera"
                />
                <viewport
                    x={this.props.width / 2}
                    y={0}
                    width={this.props.width / 2}
                    height={this.props.height}
                    cameraName="surface-camera"
                />
                <scene>       
                    <ambientLight 
                        color={0xffffff}
                        intensity={0.9}
                    />                              
                    <perspectiveCamera
                        name="camera"
                        fov={75}
                        aspect={this.props.width / 2 / this.props.height}
                        near={0.1}
                        far={1000}
                        position={new Vector3(0, 0, 500)}
                    />                                       
                    <Star
                        name="Kepler-310"
                        radius={unit('0.88 rsun').toNumber('rjupiter')}
                        temperatureEffective={unit('5800.0 kelvin').toNumber('kelvin')}
                    >         
                        <Planet
                            name="Kepler-310 d"
                            radius={unit('0.22 rjupiter').toNumber('rjupiter')}
                            orbitalSemiMajorAxis={unit('0.4014 au').toNumber('rjupiter')}
                            orbitalEccentricity={0.0}
                            orbitalPeriod={unit('92.87613 days').toNumber('days')}
                            mass={unit('0.00371 mjupiter').toNumber('mjupiter')}
                            time={this.state.time}
                            color={0x0000ff}
                        > 
                            <perspectiveCamera
                                name="planet-camera"
                                fov={75}
                                aspect={this.props.width / 2 / this.props.height}
                                near={0.001}
                                far={10000}
                                position={new Vector3(0, 6 * unit('0.22 rjupiter').toNumber('rjupiter'), 0)}
                                lookAt={new Vector3(0, 0, 0)}
                            />
                            <perspectiveCamera
                                name="surface-camera"
                                fov={75}
                                aspect={this.props.width / 2 / this.props.height}
                                near={0.001}
                                far={10000}
                                position={new Vector3(0, 1.01 * unit('0.22 rjupiter').toNumber('rjupiter'), 0)}
                                lookAt={new Vector3(0.99, 1.01 * unit('0.22 rjupiter').toNumber('rjupiter'), 0)}
                            /> 
                        </Planet>
                    </Star>
                    <PointCloud
                        numPoints={1000}
                        spread={10000}
                        color={0xffffff}
                    />                             
                </scene>
            </React3>
        );
    }
}

export default Scene;