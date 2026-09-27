import * as THREE from "three";

interface DirectionalLightGizmoProps {
    position: THREE.Vector3;
}

const DirectionalLightGizmo = ({ position }: DirectionalLightGizmoProps) => {

    return (
        <mesh position={position}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="yellow" />
        </mesh>
    )
}

export default DirectionalLightGizmo;