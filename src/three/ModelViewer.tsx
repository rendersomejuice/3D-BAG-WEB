import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { standarizeMaterials, getMaterials } from "../utils/StandarizeMaterials";
import MaterialsViewer from "../components/MaterialsViewer";
import * as THREE from "three";

export interface ModelFile{
    file:File | null
}

interface ModelLoaderProps {
    url: string;
    extension: string;
    onMaterialsLoaded: (materials: THREE.MeshStandardMaterial[]) => void;
}

const ModelLoader = ({ url, extension, onMaterialsLoaded}: ModelLoaderProps) => {

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
        if(model) {
            const materials = getMaterials(model);
            onMaterialsLoaded(materials); // Enviamos los materiales al padre
        }
    },[model, onMaterialsLoaded]);

    if (!model) return null;

    return (
        <Center>
            <primitive object={model} />
        </Center>
    );
  
};

const ModelViewer = ({file}:ModelFile) => {

    const [modelURL, setModelURL] = useState<string | null>(null);
    const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
    const extension = file?.name.split(".").pop()?.toLowerCase();

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
        <div className="model-viewer">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {modelURL && extension && <ModelLoader url={modelURL} extension={extension} onMaterialsLoaded={setMaterials}/>}
                <OrbitControls enableDamping />
            </Canvas>
        </div>
        <div className="materials-panel">
            <MaterialsViewer materials={materials}/>
        </div>
    </div>

  )
}

export default ModelViewer