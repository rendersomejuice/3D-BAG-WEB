import { useState } from "react";
import * as THREE from "three";

interface MaterialsViewerProps {
  materials: THREE.MeshStandardMaterial[];
}

export interface TextureFile{
    file:THREE.Texture | null
}

const MaterialsViewer = ({materials} : MaterialsViewerProps) => {

  const [, forceUpdate] = useState(0); //we use forceupdate to avoid creating a state for every property

  type MaterialNumericProperty = "roughness" | "metalness" | "opacity";

  type MaterialBooleanProperty = "transparent";

  type MaterialColorProperty = "emissive" | "color";

  function changeMaterialProperty(
    material:THREE.MeshStandardMaterial, 
    value : number | boolean | THREE.Color, 
    property : MaterialNumericProperty | MaterialBooleanProperty | MaterialColorProperty ){
      (material[property] as number | boolean | THREE.Color) = value;
      property === "transparent" ? material.needsUpdate = true : material.needsUpdate = false;
      forceUpdate((prev) => prev + 1);
  }

  const handleDiffuseChange = (material:THREE.MeshStandardMaterial, e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, (texture) => {

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.name = file.name;

        material.map = texture;
        material.needsUpdate = true;

        forceUpdate((prev) => prev + 1);

        URL.revokeObjectURL(url);
    });
  }

    return (
      <div>
        <h3>MATERIALS</h3>
        <hr/>
          {materials.map((material, index) => (
              <div key={index} className="text-white">
                  {material.name}
                  <ul>
                    <li>
                      <span className="property-title">{'Diffuse: '}</span> 
                      <span className="property-container">
                      <span className="property">{material.map?.name}</span>
                      <label className="property-button">
                        ...
                        <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) =>{handleDiffuseChange(material, e)}} style={{ display: "none" }}/>
                      </label>
                      </span>
                    </li>
                    <li>
                      <span className="property-title">{'Color: '}</span>
                      <span className="property">#{material.color.getHexString()}</span>
                      <input type="color" id="color" value={`#${material.color.getHexString()}`} onChange={(e) => {changeMaterialProperty(material, new THREE.Color(e.target.value), 'color')} }></input>
                    </li>
                    <li><span className="property-title">{'Normal: '}</span> <span className="property">{material.normalMap?.name}</span></li>
                    <li><span className="property-title">{'Ao: '}</span><span className="property">{material.aoMap?.name}</span></li>
                    <li><span className="property-title">{'Emissive map: '}</span><span className="property">{material.emissiveMap?.name}</span></li>
                    <li>
                      <span className="property-title">{'Emissive color: '}</span>
                      <span className="property">#{material.emissive.getHexString()}</span>
                      <input type="color" id="color" value={`#${material.emissive.getHexString()}`} onChange={(e) => {changeMaterialProperty(material, new THREE.Color(e.target.value), 'emissive')} }></input>
                    </li>
                    <li><span className="property-title">{'Alpha: '}</span><span className="property">{material.alphaMap?.name}</span></li>
                    <li>
                      <span className="property-title">{'Transparent: '}</span>
                      <span className="property">{material.transparent? 'yes' : 'no'}</span>
                      <input type='checkbox' checked={material.transparent} onChange={(e) => {changeMaterialProperty(material, Number(e.target.checked), 'transparent')}}/>
                    </li>
                    {(material.transparent) &&<li>
                      <span className="property-title">{'Opacity: '}</span><span className="property">{material.opacity.toFixed(2)}</span>
                      <input type="range" min={0} max={1} step={0.01} value={material.opacity} onChange={(e) => {changeMaterialProperty(material, Number(e.target.value), 'opacity')}}/>
                    </li>}
                    <li>
                      <span className="property-title">{'Roughness: '}</span><span className="property">{material.roughness.toFixed(2)}</span>
                      <input type="range" min={0} max={1} step={0.01} value={material.roughness} onChange={(e) => {changeMaterialProperty(material, Number(e.target.value), 'roughness')}}/>
                    </li>
                    <li>
                      <span className="property-title">{'Metallness: '}</span><span className="property">{material.metalness.toFixed(2)}</span>
                      <input type="range" min={0} max={1} step={0.01} value={material.metalness} onChange={(e) => {changeMaterialProperty(material, Number(e.target.value), 'metalness')}}/>
                    </li>
                  </ul>
              </div>
          ))}
      </div>
    );
}

export default MaterialsViewer