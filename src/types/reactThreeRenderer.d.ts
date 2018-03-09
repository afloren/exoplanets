declare module 'react-three-renderer';

declare namespace JSX {
    interface IntrinsicElements {
        scene: any;
        group: any;
        perspectiveCamera: any;
        ambientLight: any;
        pointLight: any;
        mesh: any;
        boxGeometry: any;
        sphereGeometry: any;
        meshStandardMaterial: any;
        viewport: any;
        cameraHelper: any;
        points: any;
        pointsMaterial: any;
        geometry: any;
        shaderMaterial: any;
    }
}
