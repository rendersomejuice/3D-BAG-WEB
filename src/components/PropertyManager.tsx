import * as THREE from "three";

interface PropertyManagerProps{
    material: THREE.MeshStandardMaterial,
    property: MaterialNumericProperty | MaterialBooleanProperty | MaterialColorProperty,
    displayName: string,
    forceUpdate: (prev:any) => void
}

type MaterialNumericProperty = "roughness" | "metalness" | "opacity";

type MaterialBooleanProperty = "transparent";

type MaterialColorProperty = "emissive" | "color";

const PropertyManager = ({material, property, displayName, forceUpdate} : PropertyManagerProps) => {

    function changeMaterialProperty(
        material:THREE.MeshStandardMaterial, 
        value : number | boolean | THREE.Color, 
        property : MaterialNumericProperty | MaterialBooleanProperty | MaterialColorProperty ){
            (material[property] as number | boolean | THREE.Color) = value;
            property === "transparent" ? material.needsUpdate = true : material.needsUpdate = false;
            forceUpdate((prev:any) => prev + 1);
    }
    
    const value:any = material[property];
    if(value instanceof THREE.Color){
        return (
            <li>  
                <span className="property-title">{displayName}</span>
                <span className="property">#{(material[property] as THREE.Color).getHexString()}</span>
                <input type="color" id="color" value={`#${(material[property] as THREE.Color).getHexString()}`} onChange={(e) => {changeMaterialProperty(material, new THREE.Color(e.target.value), property)} }></input>
            </li>
        )
    }else if(typeof value === "boolean"){
        return (
            <li>
                <span className="property-title">{displayName}</span>
                <input type='checkbox' checked={material[property] as boolean} onChange={(e) => {changeMaterialProperty(material, e.target.checked, property)}}/>
            </li>
        )
    }else if(typeof value === "number"){
        if((property === "opacity") && (!material.transparent)) return null;
        return ( 
            <li>
                <span className="property-title">{displayName}</span><span className="property">{(material[property] as number).toFixed(2)}</span>
                <input type="range" min={0} max={1} step={0.01} value={material[property] as number} onChange={(e) => {changeMaterialProperty(material, Number(e.target.value), property)}}/>
            </li>
        )
    }
}

export default PropertyManager