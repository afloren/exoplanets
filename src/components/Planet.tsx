import * as React from 'react';
import { BackSide, EllipseCurve, Matrix3, Vector3 } from 'three';

const skyVertexShader = require('../shaders/atmosphere.vs.glsl');
const skyFragmentShader = require('../shaders/atmosphere.fs.glsl');

interface SimpleProps {    
    name?: string;
    radius: number;
    orbitalSemiMajorAxis: number;
    orbitalEccentricity: number;
    orbitalPeriod?: number;    
    mass?: number;
    color?: number;
    time: number;  
}
  
interface SimpleState {
    orbit: EllipseCurve;
    skyUniforms: any;
}
  
class Planet extends React.Component<SimpleProps, SimpleState> {
    constructor(props: SimpleProps, context: never) {
        super(props, context);
        let semiMajorAxis = props.orbitalSemiMajorAxis;
        let semiMinorAxis = semiMajorAxis * Math.sqrt(1 - Math.pow(props.orbitalEccentricity, 2));
        let focalDistance = Math.sqrt(Math.pow(semiMajorAxis, 2) - Math.pow(semiMinorAxis, 2));
        this.state = {
            orbit: new EllipseCurve(
                focalDistance, 
                0, 
                semiMajorAxis, 
                semiMinorAxis, 
                0, 2 * Math.PI, 
                false, 
                0),
            skyUniforms: {
                luminance: { value: 1 },
                turbidity: { value: 2 },
                rayleigh: { value: 1 },
                mieCoefficient: { value: 0.005 },
                mieDirectionalG: { value: 0.8 },
                sunPosition: { value: new Vector3(0, 0, 0) }
            },
        };
    }
  
    render() {
        let position2 = this.state.orbit.getPoint(this.props.time % (2 * Math.PI));
        let position = new Vector3(position2.x, position2.y, 0).applyMatrix3(new Matrix3());        
        return (        
            <group
                position={position}
            >                               
                <mesh>
                    <sphereGeometry
                        radius={1.1 * this.props.radius}
                        widthSegments={100}
                        heightSegments={100}
                    />
                    <shaderMaterial 
                        vertexShader={skyVertexShader}
                        fragmentShader={skyFragmentShader}
                        uniforms={{
                            luminance: { value: 1 },
                            turbidity: { value: 2 },
                            rayleigh: { value: 1 },
                            mieCoefficient: { value: 0.005 },
                            mieDirectionalG: { value: 0.8 },
                            sunPosition: { value: position.negate() }
                        }}
                        transparent={true}
                        side={BackSide}
                    />
                </mesh>
                <mesh>                    
                    <sphereGeometry 
                        radius={this.props.radius}
                        widthSegments={100}
                        heightSegments={100}
                    />
                    <meshStandardMaterial
                        color={this.props.color}
                    />
                </mesh>
                {this.props.children}                
            </group>
        );
    }
}

export default Planet;