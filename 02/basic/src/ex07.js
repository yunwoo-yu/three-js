import * as THREE from "three";

// ----- 주제: Fog (안개) 만들기

export default function example() {
  // JS로 동적 캔버스 생성
  // const renderer = new THREE.WebGLRenderer();

  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 3, 7);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.y = 1;
  camera.position.z = 5;

  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);

  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const meshes = [];
  let mesh;

  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, meterial);

    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;

    scene.add(mesh);
    meshes.push(mesh);
  }

  scene.add(mesh);

  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;

    time = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    // 카메라 종횡비 조절
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
  draw();
}
