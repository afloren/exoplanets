import * as React from 'react';
import { Math, Vector3 } from 'three';

interface SimpleProps {
    numPoints: number;
    spread: number;
    color: number;
}
  
interface SimpleState {
    pointCloudVertices: Vector3[];
}

class PointCloud extends React.Component<SimpleProps, SimpleState> {
    constructor(props: SimpleProps, context: never) {
        super(props, context);
        let pointCloudVertices = [];
        for (let i = 0; i < this.props.numPoints; i++) {
            const vertex = new Vector3(
                Math.randFloatSpread(this.props.spread),
                Math.randFloatSpread(this.props.spread),
                Math.randFloatSpread(this.props.spread),
            );
            pointCloudVertices.push(vertex);
        }
        this.state = {
            pointCloudVertices
        };
    }

    render() {
        return (
            <points>
                <geometry vertices={this.state.pointCloudVertices}/>
                <pointsMaterial
                    color={this.props.color}
                />
            </points>
        );
    } 
}

export default PointCloud;