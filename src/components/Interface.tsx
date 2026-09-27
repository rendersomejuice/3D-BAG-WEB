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
        <>
        <section className="general-section">
            <h1>3D BAG WEB</h1>
            <ModelViewer file={file}/>
            <div className="loadbar-container">
                <input ref={fileInputRef} type="file" accept=".fbx, .obj, .glb" onChange={handleFileChange} style={{display:'none'}}/>
                <button onClick={handleButtonToInput}>Load Model</button><p className="text-white inline">.glb, .fbx</p>
            </div>
        </section>
        <p style={{"textAlign" : 'center', 'fontSize' : '0.8em', 'padding': '5px', 'color': 'grey'}}>3D-BAG-WEB is a tool developed by Alejandro Garcia Pol(RenderSomeJuice).</p>
        </>
    )
}

export default Interface