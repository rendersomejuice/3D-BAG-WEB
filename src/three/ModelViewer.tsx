import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { standarizeMaterials, getMaterials } from "../utils/StandarizeMaterials";
import { normalizeModelScale } from "../utils/StandarizeModels";
import MaterialsViewer from "../components/MaterialsViewer";
import FPSLimiter from "../components/utils/FPSLimiter"
import * as THREE from "three";
import EnvironmentSettings from "../components/EnvironmentSettings";
import ShadowPlane from "./ShadowPlane";
import DirectionalLightGizmo from "../components/utils/DirectionalLightGizmo";
import Skybox from "./Skybox";

export interface ModelFile{
    file:File | null
}

interface ModelLoaderProps {
    url: string;
    extension: string;
    onMaterialsLoaded: (materials: THREE.MeshStandardMaterial[]) => void;
    onGroundY: (y: number) => void;
}

interface LoadedModel {
    url: string;
    extension: string;
}

const ModelLoader = ({ url, extension, onMaterialsLoaded, onGroundY}: ModelLoaderProps) => {

    let model: THREE.Object3D | null = null;

    if(extension === 'glb'){
        const { scene } =  useGLTF(url); 
        model = scene;
        normalizeModelScale(model);
    }else if(extension === 'fbx'){
        const fbx = useLoader(FBXLoader, url);
        model = fbx;
        standarizeMaterials(fbx);
        normalizeModelScale(fbx);
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
    //model
    const [model, setModel] = useState<LoadedModel | null>(null);
    const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
    //shadow plane
    const [shadowplaneActive, setshadowplaneActive] = useState<boolean>(false);
    const [groundY, setGroundY] = useState(0);
    //directional light
    const [directionalLightPosition, setdirectionalLightPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 100));
    const [directionalLightIntensity, setdirectionalLightIntensity] = useState<number>(1)
    const [dlGizmoVisible, setdlGizmoVisible] = useState<boolean>(false);
    const [dlColor, setdlColor] = useState<string>('#ffffff');
    //skybox
    const [skyboxFile, setSkyboxFile] = useState<string>('');
    const [skyboxIsBG, setskyboxIsBG] = useState<boolean>(true);

    const changeDirectionalLightPosition = (axis: "x" | "y" | "z", value : number) => {
        setdirectionalLightPosition((prev) =>{
            const newPosition = prev.clone();
            newPosition[axis] = value;
            return newPosition;
        });
    }

    const handleSkyboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file) + `#.${file.name.split(".").pop()}`;
        setSkyboxFile(url);
    }

    useEffect(() => {

        if (!file) return;

        const url = URL.createObjectURL(file);
        const extension = file.name.split(".").pop()?.toLowerCase();

        if (!extension) return;

        setModel({url, extension});

        return () => {
            URL.revokeObjectURL(url);
            setMaterials([]);
        };

    }, [file]);

  return (
    <div className="viewer-container">
        <div className="materials-panel">
            <EnvironmentSettings shadowplaneActive={shadowplaneActive} 
                                setshadowplaneActive={setshadowplaneActive} 
                                directionalLightPosition={directionalLightPosition} 
                                changeDirectionalLightPosition={changeDirectionalLightPosition}
                                directionalLightIntensity={directionalLightIntensity}
                                setdirectionalLightIntensity={setdirectionalLightIntensity}
                                setdlGizmoVisible={setdlGizmoVisible}
                                setdlColor={setdlColor} dlColor={dlColor}
                                skyboxFile={skyboxFile} setSkyboxFile={setSkyboxFile} 
                                skyboxIsBG={skyboxIsBG} setskyboxIsBG={setskyboxIsBG}
                                handleSkyboxChange={handleSkyboxChange}/>
        </div>
        <div className="model-viewer">
            <Canvas dpr={1} shadows>
                <ambientLight intensity={0.5} />
                <directionalLight position={directionalLightPosition} intensity={directionalLightIntensity} color={dlColor} castShadow />
                { skyboxFile !== '' && <Skybox isBackground={skyboxIsBG} file={skyboxFile}/>}
                { dlGizmoVisible && <DirectionalLightGizmo position={directionalLightPosition}/>}
                { model && (<ModelLoader url={model.url} extension={model.extension} onMaterialsLoaded={setMaterials} onGroundY={setGroundY}/>)}
                { shadowplaneActive && <ShadowPlane positionY={groundY}/>}
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