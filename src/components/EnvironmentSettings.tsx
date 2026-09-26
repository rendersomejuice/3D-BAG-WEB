import { useState } from "react"
import * as THREE from "three";

interface EnvironmentSettingsProps{
    shadowplaneActive: boolean,
    setshadowplaneActive : React.Dispatch<React.SetStateAction<boolean>>,
    changeDirectionalLightPosition : (axis: "x" | "y" | "z", value: number) => void,
    directionalLightPosition: THREE.Vector3,
    directionalLightIntensity: number,
    setdirectionalLightIntensity : (value : number) => void
}

const EnvironmentSettings = ({shadowplaneActive, setshadowplaneActive, changeDirectionalLightPosition, directionalLightPosition, directionalLightIntensity, setdirectionalLightIntensity} : EnvironmentSettingsProps) => {
    const [backgroundColor, setBackgroundColor] = useState<string>("grey");

    const handleChangeBackgroundColor = (e : string) => {
        const element = document.querySelector(".model-viewer") as HTMLElement;
        if (element) {
            element.style.backgroundColor = e;
            setBackgroundColor(e);
        }
    }

    return (
        <div className="text-white">
            <h3>ENVIRONMENT</h3>
            <hr/>
            <ul>
                <li>
                    <span className="property-title">Plane: </span>
                    <input type='checkbox' checked={shadowplaneActive} onChange={(e) => setshadowplaneActive(e.target.checked)}/>
                </li>
                <li>
                    <span className="property-title">Background Color: </span>
                    <input type="color" id="color" value={backgroundColor} onChange={(e) => handleChangeBackgroundColor(e.target.value)}/>
                </li>
            </ul>
            <hr/>
            <ul>
                <div className="property-title">Directional Light: </div>
                <div><span className="property">X:</span><input type="range" min={-300} max={300} value={directionalLightPosition.x} onChange={(e) => {changeDirectionalLightPosition("x", Number(e.target.value))}}/>{directionalLightPosition.x}</div>
                <div><span className="property">Y:</span><input type="range" min={10} max={300} value={directionalLightPosition.y} onChange={(e) => {changeDirectionalLightPosition("y", Number(e.target.value))}}/>{directionalLightPosition.y}</div>
                <div><span className="property">Z:</span><input type="range" min={-200} max={200} value={directionalLightPosition.z} onChange={(e) => {changeDirectionalLightPosition("z", Number(e.target.value))}}/>{directionalLightPosition.z}</div>
                <div><span className="property">Intensity:</span><input type="range" min={0} max={100} value={directionalLightIntensity} onChange={(e) => {setdirectionalLightIntensity(Number(e.target.value))}}/>{directionalLightIntensity}</div>
            </ul>
        </div>
    )
}

export default EnvironmentSettings