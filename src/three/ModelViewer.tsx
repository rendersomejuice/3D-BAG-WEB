import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { standarizeMaterials, getMaterials } from "../utils/StandarizeMaterials";
import MaterialsViewer from "../components/MaterialsViewer";
import FPSLimiter from "../components/utils/FPSLimiter"
import * as THREE from "three";
import EnvironmentSettings from "../components/EnvironmentSettings";
import ShadowPlane from "./ShadowPlane";

export interface ModelFile{
    file:File | null
}

interface ModelLoaderProps {
    url: string;
    extension: string;
    onMaterialsLoaded: (materials: THREE.MeshStandardMaterial[]) => void;
    onGroundY: (y: number) => void;
}

const ModelLoader = ({ url, extension, onMaterialsLoaded, onGroundY}: ModelLoaderProps) => {

    let model: THREE.Object3D | null = null;

    if(extension === 'glb'){
        const { scene } =  useGLTF(url); 
        model = scene;
    }else if(extension === 'fbx'){
        const fbx = useLoader(FBXLoader, url);
        model = fbx;
        standarizeMaterials(fbx);
    }

    useEffect(() => {
        if (!model) return;

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = false;
            }
        });

        const materials = getMaterials(model);
        onMaterialsLoaded(materials);

    }, [model, onMaterialsLoaded]);

    if (!model) return null;

    return (
        <Center onCentered={({ height }) => { onGroundY(-height / 2); }}>
            <primitive object={model} receiveShadow />
        </Center>
    );
  
};

const ModelViewer = ({file}:ModelFile) => {

    const [modelURL, setModelURL] = useState<string | null>(null);
    const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
    const extension = file?.name.split(".").pop()?.toLowerCase();

    const [shadowplaneActive, setshadowplaneActive] = useState<boolean>(false);
    const [groundY, setGroundY] = useState(0);

    useEffect(() => {

        if (!file) return;

        const url = URL.createObjectURL(file);
        setModelURL(url);

        return () => {
            URL.revokeObjectURL(url);
            setMaterials([]);
        };

    },[file]);

  return (
    <div className="viewer-container">
        <div className="materials-panel">
            <EnvironmentSettings shadowplaneActive={shadowplaneActive} setshadowplaneActive={setshadowplaneActive}/>
        </div>
        <div className="model-viewer">
            <Canvas dpr={1} shadows>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                {modelURL && extension && <ModelLoader url={modelURL} extension={extension} onMaterialsLoaded={setMaterials} onGroundY={setGroundY}/>}
                {shadowplaneActive && <ShadowPlane positionY={groundY}/>}
                <OrbitControls enableDamping />
                <FPSLimiter/>
            </Canvas>
        </div>
        <div className="materials-panel">
            <MaterialsViewer materials={materials}/>
        </div>
    </div>

  )
}

export default ModelViewer