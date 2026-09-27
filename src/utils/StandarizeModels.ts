import * as THREE from "three";

export const normalizeModelScale = (model: THREE.Object3D, targetSize = 2) => {

    const box = new THREE.Box3().setFromObject(model);

    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDimension = Math.max(
        size.x,
        size.y,
        size.z
    );

    if (maxDimension <= 0) return;

    const scaleFactor = targetSize / maxDimension;

    model.scale.multiplyScalar(scaleFactor);
};