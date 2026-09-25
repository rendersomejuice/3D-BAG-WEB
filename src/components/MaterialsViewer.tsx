import { useState } from "react";
import * as THREE from "three";

interface MaterialsViewerProps {
  materials: THREE.MeshStandardMaterial[];
}

const MaterialsViewer = ({materials} : MaterialsViewerProps) => {

  const [, forceUpdate] = useState(0); //we use forceupdate to avoid creating a state for every property

  const handleRoughnessChange = (material:THREE.MeshStandardMaterial, value : number) => {
    material.roughness = value;
    forceUpdate((prev) => prev + 1);
  }

  const handleMetalnessChange = (material:THREE.MeshStandardMaterial, value : number) => {
    material.metalness = value;
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
                    <li><span className="property-title">{'Diffuse: '}</span> <span className="property">{material.map?.name}</span></li>
                    <li><span className="property-title">{'Normal: '}</span> <span className="property">{material.normalMap?.name}</span></li>
                    <li><span className="property-title">{'Ao: '}</span><span className="property">{material.aoMap?.name}</span></li>
                    <li><span className="property-title">{'Emissive map: '}</span><span className="property">{material.emissiveMap?.name}</span></li>
                    <li><span className="property-title">{'Emissive color: '}</span><span className="property">#{material.emissive.getHexString()}</span></li>
                    <li><span className="property-title">{'Alpha: '}</span><span className="property">{material.alphaMap?.name}</span></li>
                    <li><span className="property-title">{'Transparent: '}</span><span className="property">{material.transparent? 'yes' : 'no'}</span></li>
                    <li><span className="property-title">{'Opacity: '}</span><span className="property">{material.opacity}</span></li>
                    <li><span className="property-title">{'Roughness: '}</span><span className="property">{material.roughness.toFixed(2)}</span>
                      <input type="range" min={0} max={1} step={0.01} value={material.roughness} onChange={(e) => {handleRoughnessChange(material, Number(e.target.value))}}/>
                    </li>
                    <li><span className="property-title">{'Metallness: '}</span><span className="property">{material.metalness}</span>
                      <input type="range" min={0} max={1} step={0.01} value={material.metalness} onChange={(e) => {handleMetalnessChange(material, Number(e.target.value))}}/>
                    </li>
                  </ul>
              </div>
          ))}
      </div>
    );
}

export default MaterialsViewer