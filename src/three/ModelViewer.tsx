import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { standardizeMaterials } from "../utils/StandarizeMaterials";

export interface ModelFile{
    file:File | null
}

const ModelLoader = ({ url, extension }: { url: string, extension: string }) => {

  switch(extension){
    case "glb":
        const { scene } =  useGLTF(url); 
        return (
            <Center>
                <primitive object={scene} />
            </Center>
        );

    case "fbx":
        const fbx = useLoader(FBXLoader, url);
        standardizeMaterials(fbx);
        return (
            <Center>
                <primitive object={fbx} />
            </Center>
        );
  }
  
};

const ModelViewer = ({file}:ModelFile) => {

    const [modelURL, setModelURL] = useState<string | null>(null);
    const extension = file?.name.split(".").pop()?.toLowerCase();

    useEffect(() => {

        if (!file) return;

        const url = URL.createObjectURL(file);
        setModelURL(url);

        return () => {
            URL.revokeObjectURL(url);
        };

    },[file]);

  return (
    <div className="model-viewer">
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {modelURL && extension && <ModelLoader url={modelURL} extension={extension}/>}
            <OrbitControls enableDamping />
        </Canvas>
    </div>
  )
}

export default ModelViewer