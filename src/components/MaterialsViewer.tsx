import { useState } from "react";
import * as THREE from "three";
import TextureManager from "./TextureManager";

interface MaterialsViewerProps {
  materials: THREE.MeshStandardMaterial[];
}

export interface TextureFile{
    file:THREE.Texture | null
}

type MaterialNumericProperty = "roughness" | "metalness" | "opacity";

type MaterialBooleanProperty = "transparent";

type MaterialColorProperty = "emissive" | "color";

const MaterialsViewer = ({materials} : MaterialsViewerProps) => {

  const [, forceUpdate] = useState(0); //we use forceupdate to avoid creating a state for every property

  function changeMaterialProperty(
    material:THREE.MeshStandardMaterial, 
    value : number | boolean | THREE.Color, 
    property : MaterialNumericProperty | MaterialBooleanProperty | MaterialColorProperty ){
      (material[property] as number | boolean | THREE.Color) = value;
      property === "transparent" ? material.needsUpdate = true : material.needsUpdate = false;
      forceUpdate((prev) => prev + 1);
  }

  const handleInvertNormal = (material:THREE.MeshStandardMaterial, value : boolean) => {
    material.normalScale.y = value ? -Math.abs(material.normalScale.y) : Math.abs(material.normalScale.y);
    forceUpdate((prev) => prev + 1);
  }

    return (
      <div>
        <h3>MATERIALS</h3>
        <hr/>
          {materials.map((material, index) => (
              <div key={index} className="text-white">
                  {material.name}
                  <ul>

                    <TextureManager material={material} property={'map'} displayName="Diffuse Map: "/>

                    <li>
                      <span className="property-title">{'Color: '}</span>
                      <span className="property">#{material.color.getHexString()}</span>
                      <input type="color" id="color" value={`#${material.color.getHexString()}`} onChange={(e) => {changeMaterialProperty(material, new THREE.Color(e.target.value), 'color')} }></input>
                    </li>

                    <TextureManager material={material} property={'normalMap'} displayName="Normal Map: "/>

                    <li>
                      <span className="property-title">Invert Normal:</span>
                      <input type='checkbox' checked={material.normalScale.y < 0} onChange={(e) => {handleInvertNormal(material, e.target.checked)}}/> 
                    </li>

                    <TextureManager material={material} property={'aoMap'} displayName="AO Map: "/>

                    <TextureManager material={material} property={'emissiveMap'} displayName="Emissive Map: "/>

                    <li>
                      <span className="property-title">{'Emissive color: '}</span>
                      <span className="property">#{material.emissive.getHexString()}</span>
                      <input type="color" id="color" value={`#${material.emissive.getHexString()}`} onChange={(e) => {changeMaterialProperty(material, new THREE.Color(e.target.value), 'emissive')} }></input>
                    </li>

                    <TextureManager material={material} property={'alphaMap'} displayName="Alpha Map: "/>

                    <li>
                      <span className="property-title">{'Transparent: '}</span>
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

                    <TextureManager material={material} property={'roughnessMap'} displayName="Roughness Map: "/>

                    <li>
                      <span className="property-title">{'Metallness: '}</span><span className="property">{material.metalness.toFixed(2)}</span>
                      <input type="range" min={0} max={1} step={0.01} value={material.metalness} onChange={(e) => {changeMaterialProperty(material, Number(e.target.value), 'metalness')}}/>
                    </li>

                    <TextureManager material={material} property={'metalnessMap'} displayName="Metalness Map: "/>

                  </ul>
              </div>
          ))}
      </div>
    );
}

export default MaterialsViewer