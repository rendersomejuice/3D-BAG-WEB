import { Center } from "@react-three/drei";
interface ShadowPlaneProps {
    positionY: number;
}
const ShadowPlane = ({ positionY }: ShadowPlaneProps) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, positionY, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <shadowMaterial transparent opacity={0.3}/>
    </mesh>
  )
}

export default ShadowPlane