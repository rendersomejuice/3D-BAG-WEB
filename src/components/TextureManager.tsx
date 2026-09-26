import * as THREE from "three";
import { useState } from "react";

interface TextureManagerProps{
    material: THREE.MeshStandardMaterial,
    property: MaterialTextureProperty,
    displayName: string,
}

export type MaterialTextureProperty = "map" | "emissiveMap" | "aoMap" | "alphaMap" | "normalMap" | "roughnessMap" | "metalnessMap";

const TextureManager = ({material, property, displayName}:TextureManagerProps) => {
    const [, forceUpdate] = useState(0); //we use forceupdate to avoid creating a state for every property ||||TO-DO !!!! extract this to a util or external file or keep it in the father
    const [lastTexture, setLastTexture] = useState<THREE.Texture | null>(material[property]);

    const handleTextureChange = (material:THREE.MeshStandardMaterial, e:React.ChangeEvent<HTMLInputElement>, property : MaterialTextureProperty) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, (texture) => {

        (property === "map" || property === "emissiveMap") ? texture.colorSpace =  THREE.SRGBColorSpace : texture.colorSpace =  THREE.NoColorSpace;
        texture.name = file.name;

        const referenceTexture = material[property] ?? lastTexture;

        if (referenceTexture) {
            texture.flipY = referenceTexture.flipY;
            texture.wrapS = referenceTexture.wrapS;
            texture.wrapT = referenceTexture.wrapT;
            texture.repeat.copy(referenceTexture.repeat);
            texture.offset.copy(referenceTexture.offset);
            texture.rotation = referenceTexture.rotation;
            texture.center.copy(referenceTexture.center);
            texture.channel = referenceTexture.channel;
        }

        material[property] = texture;
        material.needsUpdate = true;

        forceUpdate((prev) => prev + 1);

        URL.revokeObjectURL(url);
    });
}

const dropTexture = (material:THREE.MeshStandardMaterial, property : MaterialTextureProperty) => {
    const currentTexture = material[property];

    if (currentTexture) {
        setLastTexture(currentTexture);
    }

    material[property] = null;
    material.needsUpdate = true;
    forceUpdate((prev) => prev + 1);
}
    
    return (
        <li>
            <span className="property-title">{ displayName }</span> 
            <span className="property-container">
            <span className="property">{material[property]?.name}</span>
            <label className="property-button">
            ...
            <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) =>{handleTextureChange(material, e, property)}} style={{ display: "none" }}/>
            </label>
            {material[property] && <button className="delete-button" onClick={() => {dropTexture(material, property)}}>X</button>}
            </span>
        </li>
    )
}

export default TextureManager