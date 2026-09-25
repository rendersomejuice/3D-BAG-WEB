import * as THREE from "three";

interface MaterialsViewerProps {
  materials: THREE.MeshStandardMaterial[];
}

const MaterialsViewer = ({materials} : MaterialsViewerProps) => {
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
                    <li><span className="property-title">{'Roughness: '}</span><span className="property">{material.roughness}</span></li>
                    <li><span className="property-title">{'Metallness: '}</span><span className="property">{material.metalness}</span></li>
                  </ul>
              </div>
          ))}
      </div>
    );
}

export default MaterialsViewer