import { useRef, useState } from "react";
import ModelViewer from "../three/ModelViewer";

const Interface = () => {

    const [file, setFile] = useState<File|null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            setFile(file);
        }
    };

    const handleButtonToInput = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    return (
        <section className="general-section">
            <h1>3D BAG WEB</h1>
            <ModelViewer file={file}/>
            <input ref={fileInputRef} type="file" accept=".fbx, .obj, .glb" onChange={handleFileChange} style={{display:'none'}}/>
            <button onClick={handleButtonToInput}>Load Model</button><p className="text-white inline">.glb, .fbx</p>
        </section>
    )
}

export default Interface