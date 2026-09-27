import { useState } from "react"
import * as THREE from "three";
import { skyboxes } from "../constants"

interface EnvironmentSettingsProps{
    shadowplaneActive: boolean,
    setshadowplaneActive : React.Dispatch<React.SetStateAction<boolean>>,
    changeDirectionalLightPosition : (axis: "x" | "y" | "z", value: number) => void,
    directionalLightPosition: THREE.Vector3,
    directionalLightIntensity: number,
    setdirectionalLightIntensity : (value : number) => void,
    setdlGizmoVisible : (value : boolean) => void,
    setdlColor : (value : string) => void,
    dlColor : string,
    skyboxFile : string,
    setSkyboxFile : (value : string) => void,
    skyboxIsBG : boolean,
    setskyboxIsBG : (value : boolean) => void
}

const EnvironmentSettings = ({shadowplaneActive, setshadowplaneActive, changeDirectionalLightPosition,
                             directionalLightPosition, directionalLightIntensity, setdirectionalLightIntensity,
                             setdlGizmoVisible, setdlColor, dlColor, skyboxFile, setSkyboxFile, skyboxIsBG, setskyboxIsBG } : EnvironmentSettingsProps) => {

    const [backgroundColor, setBackgroundColor] = useState<string>("grey");

    const [lightRotation, setLightRotation] = useState<number>(0);
    const [lightDistance, setLightDistance] = useState<number>(100);


    const handleChangeBackgroundColor = (e : string) => {
        const element = document.querySelector(".model-viewer") as HTMLElement;
        if (element) {
            element.style.backgroundColor = e;
            setBackgroundColor(e);
        }
    }

    const changeLightRotation = (rotation : number) => {

        setLightRotation(rotation);

        const radians = THREE.MathUtils.degToRad(rotation);

        const x = Math.sin(radians) * lightDistance;
        const z = Math.cos(radians) * lightDistance;

        changeDirectionalLightPosition("x", x);
        changeDirectionalLightPosition("z", z);
    }

    const changeLightDistance = (distance : number) => {

        setLightDistance(distance);

        const radians = THREE.MathUtils.degToRad(lightRotation);

        const x = Math.sin(radians) * distance;
        const z = Math.cos(radians) * distance;

        changeDirectionalLightPosition("x", x);
        changeDirectionalLightPosition("z", z);
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

                <div>
                    <span className="property">Rotation:</span>
                    <input
                        type="range"
                        step={0.01}
                        min={0}
                        max={360}
                        value={lightRotation}
                        onPointerDown={() => setdlGizmoVisible(true)}
                        onPointerUp={() => setdlGizmoVisible(false)}
                        onChange={(e) => changeLightRotation(Number(e.target.value))}
                    />
                    {lightRotation}°
                </div>

                <div>
                    <span className="property">Height:</span>
                    <input
                        type="range"
                        step={0.01}
                        min={-50}
                        max={50}
                        value={directionalLightPosition.y}
                        onPointerDown={() => setdlGizmoVisible(true)}
                        onPointerUp={() => setdlGizmoVisible(false)}
                        onChange={(e) => changeDirectionalLightPosition("y", Number(e.target.value))}
                    />
                    {directionalLightPosition.y}
                </div>

                <div>
                    <span className="property">Distance:</span>
                    <input
                        type="range"
                        step={0.01}
                        min={0}
                        max={50}
                        value={lightDistance}
                        onPointerDown={() => setdlGizmoVisible(true)}
                        onPointerUp={() => setdlGizmoVisible(false)}
                        onChange={(e) => changeLightDistance(Number(e.target.value))}
                    />
                    {lightDistance}
                </div>
                <div><span className="property">Intensity:</span><input type="range" step={0.01} min={0} max={100} value={directionalLightIntensity} onChange={(e) => {setdirectionalLightIntensity(Number(e.target.value))}}/>{directionalLightIntensity}</div>
                <div>
                    <span className="property">Color:</span>
                    <input type="color" id="color" value={dlColor} onChange={(e) => {setdlColor(e.target.value)} } />
                </div>
            </ul>
            <hr/>
            <ul>
                <li>
                    <span className="property-title">Skybox: </span>
                    <select value={skyboxFile} onChange={(e) => {setSkyboxFile(e.target.value)}}>
                        <option value="">None</option>
                        {skyboxes.map(({name, url}) =>(
                            <option key={name} value={url}>{name}</option>
                        ))}
                    </select>
                    <div><span className="property-title">Skybox Background: </span><input type="checkbox" checked={skyboxIsBG} onChange={(e) => {setskyboxIsBG(e.target.checked)}}/></div>
                </li>
            </ul>
        </div>
    )
}

export default EnvironmentSettings