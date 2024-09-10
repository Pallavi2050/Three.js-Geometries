import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(150);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

// Define materials with the same color for geometry and wireframe
const redColor = 0xff0000;
const greenColor = 0x00ff00;
const blueColor = 0x0000ff;
const yellowColor = 0xffff00;
const magentaColor = 0xff00ff;
const cyanColor = 0x00ffff;
const orangeColor = 0xffa500;
const lightBlueColor = 0x00aaff;

// Define materials
const coneMaterial = new THREE.MeshBasicMaterial({ color: redColor, side: THREE.DoubleSide });
const coneEdgeMaterial = new THREE.LineBasicMaterial({ color: redColor });

const boxMaterial = new THREE.MeshBasicMaterial({ color: greenColor, side: THREE.DoubleSide });
const boxEdgeMaterial = new THREE.LineBasicMaterial({ color: greenColor });

const capsuleMaterial = new THREE.MeshBasicMaterial({ color: blueColor, side: THREE.DoubleSide });
const capsuleEdgeMaterial = new THREE.LineBasicMaterial({ color: blueColor });

const dodecahedronMaterial = new THREE.MeshBasicMaterial({ color: yellowColor, side: THREE.DoubleSide });
const dodecahedronEdgeMaterial = new THREE.LineBasicMaterial({ color: yellowColor });

const circleMaterial = new THREE.MeshBasicMaterial({ color: magentaColor, side: THREE.DoubleSide });
const circleEdgeMaterial = new THREE.LineBasicMaterial({ color: magentaColor });

const cylinderMaterial = new THREE.MeshBasicMaterial({ color: cyanColor, side: THREE.DoubleSide });
const cylinderEdgeMaterial = new THREE.LineBasicMaterial({ color: cyanColor });

const octahedronMaterial = new THREE.MeshBasicMaterial({ color: orangeColor, side: THREE.DoubleSide });
const octahedronEdgeMaterial = new THREE.LineBasicMaterial({ color: orangeColor });

const ringMaterial = new THREE.MeshBasicMaterial({ color: lightBlueColor, side: THREE.DoubleSide });
const ringEdgeMaterial = new THREE.LineBasicMaterial({ color: lightBlueColor });

const torusMaterial = new THREE.MeshBasicMaterial({ color: redColor, side: THREE.DoubleSide });
const torusEdgeMaterial = new THREE.LineBasicMaterial({ color: redColor });

const starMaterial = new THREE.MeshBasicMaterial({ color: greenColor, side: THREE.DoubleSide });
const starEdgeMaterial = new THREE.LineBasicMaterial({ color: greenColor });

const extrudeMaterial = new THREE.MeshBasicMaterial({ color: blueColor, side: THREE.DoubleSide });
const extrudeEdgeMaterial = new THREE.LineBasicMaterial({ color: blueColor });

const latheMaterial = new THREE.MeshBasicMaterial({ color: yellowColor, side: THREE.DoubleSide });
const latheEdgeMaterial = new THREE.LineBasicMaterial({ color: yellowColor });

const heartMaterial = new THREE.MeshBasicMaterial({ color: magentaColor, side: THREE.DoubleSide });
const heartEdgeMaterial = new THREE.LineBasicMaterial({ color: magentaColor });

// Define geometries
const coneGeometry = new THREE.ConeGeometry(6, 12, 32);
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const capsuleGeometry = new THREE.CapsuleGeometry(3, 6, 32);
const dodecahedronGeometry = new THREE.DodecahedronGeometry(4);
const circleGeometry = new THREE.CircleGeometry(10, 32);
const cylinderGeometry = new THREE.CylinderGeometry(6, 6, 12, 32);
const octahedronGeometry = new THREE.OctahedronGeometry(4);
const ringGeometry = new THREE.RingGeometry(3, 9, 32);
const torusGeometry = new THREE.TorusGeometry(6, 1.5, 16, 100);

// Define star geometry
const starShape = new THREE.Shape();
const radius1 = 5;
const radius2 = 2.5;
const points = 5;

for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const x1 = Math.cos(angle) * radius1;
    const y1 = Math.sin(angle) * radius1;
    const x2 = Math.cos(angle + Math.PI / points) * radius2;
    const y2 = Math.sin(angle + Math.PI / points) * radius2;

    if (i === 0) {
        starShape.moveTo(x1, y1);
    } else {
        starShape.lineTo(x1, y1);
    }
    starShape.lineTo(x2, y2);
}
starShape.closePath();

const extrudeSettings = {
    steps: 1,
    depth: 2,
    bevelEnabled: false,
};
const starGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

// Define extrude geometry
const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const lathePoints = [];
for (let i = 0; i < 10; i++) {
    lathePoints.push(new THREE.Vector2(Math.sin(i * 0.2) * 8 + 5, (i - 5) * 2));
}
const latheGeometry = new THREE.LatheGeometry(lathePoints);

const x = 0, y = 0;
const heartShape = new THREE.Shape();
heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
const heartGeometry = new THREE.ShapeGeometry(heartShape);

// Function to create meshes with edges
const createMeshWithEdges = (geometry: THREE.BufferGeometry, material: THREE.Material, edgeMaterial: THREE.LineBasicMaterial) => {
    const mesh = new THREE.Mesh(geometry, material);
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
    edgeLines.scale.set(1.75, 1.75, 1.75);
    const group = new THREE.Group();
    group.add(mesh);
    group.add(edgeLines);
    return group;
};

// Create meshes with edges
const cone = createMeshWithEdges(coneGeometry, coneMaterial, coneEdgeMaterial);
const box = createMeshWithEdges(boxGeometry, boxMaterial, boxEdgeMaterial);
const capsule = createMeshWithEdges(capsuleGeometry, capsuleMaterial, capsuleEdgeMaterial);
const dodecahedron = createMeshWithEdges(dodecahedronGeometry, dodecahedronMaterial, dodecahedronEdgeMaterial);
const circle = createMeshWithEdges(circleGeometry, circleMaterial, circleEdgeMaterial);
const cylinder = createMeshWithEdges(cylinderGeometry, cylinderMaterial, cylinderEdgeMaterial);
const octahedron = createMeshWithEdges(octahedronGeometry, octahedronMaterial, octahedronEdgeMaterial);
const ring = createMeshWithEdges(ringGeometry, ringMaterial, ringEdgeMaterial);
const torus = createMeshWithEdges(torusGeometry, torusMaterial, torusEdgeMaterial);
const star = createMeshWithEdges(starGeometry, starMaterial, starEdgeMaterial);

const extrude = createMeshWithEdges(extrudeGeometry, extrudeMaterial, extrudeEdgeMaterial);
const lathe = createMeshWithEdges(latheGeometry, latheMaterial, latheEdgeMaterial);
const heart = createMeshWithEdges(heartGeometry, heartMaterial, heartEdgeMaterial);

// Position geometries
cone.position.set(-120, 100, 0);
box.position.set(-60, 100, 0);
capsule.position.set(0, 100, 0);
dodecahedron.position.set(60, 100, 0);
circle.position.set(120, 100, 0);

cylinder.position.set(-120, 20, 0);
octahedron.position.set(-60, 20, 0);
ring.position.set(0, 20, 0);
torus.position.set(60, 20, 0);
star.position.set(120, 20, 0);

extrude.position.set(-60, -60, 0);
lathe.position.set(0, -60, 0);
heart.position.set(60, -60, 0);

// Add meshes to scene
scene.add(cone);
scene.add(box);
scene.add(capsule);
scene.add(dodecahedron);
scene.add(circle);
scene.add(cylinder);
scene.add(octahedron);
scene.add(ring);
scene.add(torus);
scene.add(star);
scene.add(extrude);
scene.add(lathe);
scene.add(heart);

// Handle window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop with scaling and rotation
function animate() {
    requestAnimationFrame(animate);

    animateMesh(cone);
    animateMesh(box);
    animateMesh(capsule);
    animateMesh(dodecahedron);
    animateMesh(circle);
    animateMesh(cylinder);
    animateMesh(octahedron);
    animateMesh(ring);
    animateMesh(torus);
    animateMesh(star);
    animateMesh(extrude);
    animateMesh(lathe);
    animateMesh(heart);

    renderer.render(scene, camera);
    orbitControls.update();
}

function animateMesh(mesh: THREE.Group) {
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.01;
}

animate();
