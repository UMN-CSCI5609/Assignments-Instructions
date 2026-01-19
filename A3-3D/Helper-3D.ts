import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { T3DModel } from "../types";

function addGround(scene: THREE.Scene, FLOOR: number, imgPath: string) {
    const gt = new THREE.TextureLoader().load(imgPath);
    const gg = new THREE.PlaneGeometry(20, 20);
    const gm = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: gt,
    });

    const ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = -Math.PI / 2;
    ground.material.map.repeat.set(2, 2);
    ground.material.map.wrapS = ground.material.map.wrapT =
        THREE.RepeatWrapping;
    ground.material.map.colorSpace = THREE.SRGBColorSpace;
    ground.receiveShadow = true;
    ground.position.set(0, FLOOR, 0);
    ground.rotation.x = -Math.PI / 2;
    ground.scale.set(100, 100, 100);
    ground.receiveShadow = true;

    scene.add(ground);
}

function onWindowResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, w: number, h: number) {

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function  addMorph (
    scene,
    mixer,
    morphs,
    mesh,
    clip,
    speed,
    duration,
    x,
    y,
    z,
    scale,
    
) {
    mesh = mesh.clone();
    mesh.material = mesh.material.clone();


    mesh.speed = speed;
    mesh.scale.set(scale, scale, scale);
    mixer
        .clipAction(clip, mesh)
        .setDuration(duration)
        .startAt(-duration * Math.random())
        .play();

    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 2;
    mesh.castShadow = true;
    scene.add(mesh);
    morphs.push(mesh);
};


function loadModels(models: T3DModel[], scene: THREE.Scene, mixer: THREE.AnimationMixer, morphs: THREE.Mesh[]) {
    // load the models of horse, flamingo, and parrot

    const gltfLoader = new GLTFLoader();

    mixer = new THREE.AnimationMixer(scene);
    models.forEach((model) => {
        gltfLoader.load(model.path, (gltf) => {
            const mesh = gltf.scene.children[0];
            const clip = gltf.animations[0];
            addMorph(
                scene,
                mixer,
                morphs,
                mesh,
                clip,
                model.speed,
                model.duration,
                model.x,
                model.y,
                model.z,
                model.scale,
            );
        });
    });
    return mixer
}

export { addGround, onWindowResize, addMorph, loadModels };