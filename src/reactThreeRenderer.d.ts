declare module 'react-three-renderer';

declare namespace JSX {
    interface IntrinsicElements {
        scene: any;
        perspectiveCamera: any;
        ambientLight: any;
        pointLight: any;
        mesh: any;
        boxGeometry: any;
        sphereGeometry: any;
        meshStandardMaterial: any;
    }
}
