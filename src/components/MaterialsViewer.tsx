import { useState } from "react";
import * as THREE from "three";
import TextureManager from "./TextureManager";
import PropertyManager from "./PropertyManager";

interface MaterialsViewerProps {
  materials: THREE.MeshStandardMaterial[];
}

const MaterialsViewer = ({materials} : MaterialsViewerProps) => {

  const [, forceUpdate] = useState(0); //we use forceupdate to avoid creating a state for every property

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

                    <TextureManager material={material} property={'map'} displayName="Diffuse Map: " forceUpdate={forceUpdate}/>

                    <PropertyManager material={material} property={'color'} displayName="Color: " forceUpdate={forceUpdate}/>

                    <TextureManager material={material} property={'normalMap'} displayName="Normal Map: " forceUpdate={forceUpdate}/>

                    <li>
                      <span className="property-title">Invert Normal:</span>
                      <input type='checkbox' checked={material.normalScale.y < 0} onChange={(e) => {handleInvertNormal(material, e.target.checked)}}/> 
                    </li>

                    <TextureManager material={material} property={'aoMap'} displayName="AO Map: " forceUpdate={forceUpdate}/>

                    <TextureManager material={material} property={'emissiveMap'} displayName="Emissive Map: " forceUpdate={forceUpdate}/>

                    <PropertyManager material={material} property={'emissive'} displayName="Emissive: " forceUpdate={forceUpdate}/>

                    <TextureManager material={material} property={'alphaMap'} displayName="Alpha Map: " forceUpdate={forceUpdate}/>

                    <PropertyManager material={material} property={'transparent'} displayName="Transparent: " forceUpdate={forceUpdate}/>

                    <PropertyManager material={material} property={'opacity'} displayName="Opacity: " forceUpdate={forceUpdate}/>

                    <PropertyManager material={material} property={'roughness'} displayName="Roughness: " forceUpdate={forceUpdate}/>

                    <TextureManager material={material} property={'roughnessMap'} displayName="Roughness Map: " forceUpdate={forceUpdate}/>

                    <PropertyManager material={material} property={'metalness'} displayName="Metalness: " forceUpdate={forceUpdate}/>

                    <TextureManager material={material} property={'metalnessMap'} displayName="Metalness Map: " forceUpdate={forceUpdate}/>

                  </ul>
              </div>
          ))}
      </div>
    );
}

export default MaterialsViewer