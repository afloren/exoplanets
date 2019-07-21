import * as React from 'react';
import { Euler, Vector3 } from 'three';

interface SimpleProps {
    name?: string;
    radius: number;
    temperatureEffective?: number;
    color?: number;
}
  
interface SimpleState {
    position: Vector3;
    rotation: Euler;
}
  
class Star extends React.Component<SimpleProps, SimpleState> {
    constructor(props: SimpleProps, context: never) {
        super(props, context);
        this.state = {
            position: new Vector3(0, 0, 0),
            rotation: new Euler(0, 0, 0),
        };
    }
  
    render() {
        return (    
            <group
                position={this.state.position}  
                rotation={this.state.rotation}
            >
                <pointLight                    
                    color={this.props.color}
                    decay={2.0}
                    intensity={10.0}
                />    
                <mesh>
                    <sphereGeometry 
                        radius={this.props.radius}
                        widthSegments={100}
                        heightSegments={100}
                    />
                    <meshStandardMaterial
                        emissive={0xffff00}
                    />
                </mesh>
                {this.props.children}
            </group>
        );
    }
  }

export default Star;