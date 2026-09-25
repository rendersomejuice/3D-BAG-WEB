import * as THREE from "three";

const convertMaterial = (material: THREE.Material): THREE.Material => {

    if(material instanceof THREE.MeshPhongMaterial){

        const standardMaterial = new THREE.MeshStandardMaterial({
            name: material.name,

            color: material.color.clone(),

            map: material.map,

            normalMap: material.normalMap,
            normalScale: material.normalScale.clone(),

            aoMap: material.aoMap,

            emissive: material.emissive.clone(),
            emissiveMap: material.emissiveMap,

            alphaMap: material.alphaMap,

            transparent: material.transparent,
            opacity: material.opacity,

            side: material.side,

            roughness: 0.5,
            metalness: 0
        });

        return standardMaterial;
    }

    return material;
};


export const standarizeMaterials = (object: THREE.Object3D) => {

    object.traverse((child) => {

        if(!(child instanceof THREE.Mesh)) return;

        if(Array.isArray(child.material)){

            child.material = child.material.map((material) =>
                convertMaterial(material)
            );

        } else {

            child.material = convertMaterial(child.material);

        }

    });

};

export const getMaterials = ( object : THREE.Object3D) => {
    var materialsArray : THREE.MeshStandardMaterial[] = [];
    object.traverse((child) => {
        
        if(!(child instanceof THREE.Mesh)) return;

        if(Array.isArray(child.material)){
            child.material.forEach((material) =>
                materialsArray.push(material)
            );
        }else{
            materialsArray.push(child.material)
        }
    });

    return materialsArray;
}