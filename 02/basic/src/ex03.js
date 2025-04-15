import * as THREE from "three";

export default function example() {
  // JS로 동적 캔버스 생성
  // const renderer = new THREE.WebGLRenderer();

  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearAlpha(0.5);
  // renderer.setClearColor("#00ff00");
  // renderer.setClearAlpha(0.5);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue");

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.x = 1;
  camera.position.z = 5;
  camera.position.y = 2;

  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, meterial);

  scene.add(mesh);

  renderer.render(scene, camera);

  function setSize() {
    // 카메라 종횡비 조절
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
}
