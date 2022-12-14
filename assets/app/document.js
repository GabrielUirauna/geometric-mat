import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';


let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('poly'), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0);

let scene = new THREE.Scene();
scene.background = null;

let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

window.addEventListener('resize', function () {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.update();

let geometry = new THREE.BoxGeometry(3, 3, 3);
let material = new THREE.MeshLambertMaterial({ color: 0x04a1a1 });
let cube = new THREE.Mesh(geometry, material);

camera.position.z = 5;

let light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
let light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(10, 10, 10);
scene.add(light2);

let animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate()

// let tetra = document.querySelector(".dl-1");
// let hexa = document.querySelector(".dl-2");
// let octa = document.querySelector(".dl-3");
// let dode = document.querySelector(".dl-4");
// let icos = document.querySelector(".dl-5");
// let esfe = document.querySelector(".dl-6");

let datos;
fetch('../assets/data/data.json')
    .then(res => res.json())
    .then(data => {
        datos = data;
        let list = document.querySelector('.doc-list');
        data.forEach((item, index) => {
            let elem = `<li class="listElem" id="${index}">${item.name}</li>`;
            list.innerHTML += elem;
        });
    })
    .then(() => {
        let elems = document.querySelectorAll('.listElem');
        elems.forEach((elem) => {
            elem.addEventListener('click', showDoc, true);
        });
    });

let showDoc = (e) => {

    let docSel = datos[Number(e.currentTarget.id)];
    let description = document.querySelector('#description');
    description.innerHTML = `${docSel.texto}`;
    switch (docSel.id) {
        case 1:
            scene.remove(cube);
            geometry = new THREE.TetrahedronGeometry(2);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 2:
            scene.remove(cube);
            geometry = new THREE.BoxGeometry(2,2,2);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 3:
            scene.remove(cube);
            geometry = new THREE.OctahedronGeometry(2);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 4:
            scene.remove(cube);
            geometry = new THREE.DodecahedronGeometry(2);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 5:
            scene.remove(cube);
            geometry = new THREE.IcosahedronGeometry(2);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 6:
            scene.remove(cube);
            geometry = new THREE.SphereGeometry(2, 64, 64);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 7:
            scene.remove(cube);
            geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 8:
            scene.remove(cube);
            geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 9:
            scene.remove(cube);
            geometry = new THREE.CylinderGeometry(2, 2, 2, 32);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 10:
            scene.remove(cube);
            geometry = new THREE.ConeGeometry(2, 2, 32);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
        case 11:
            scene.remove(cube);
            geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            break;
    }
}
