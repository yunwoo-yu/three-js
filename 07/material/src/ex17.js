import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- 주제: MeshBasicMaterial

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  // const ambientLight = new THREE.AmbientLight("white", 0.5);
  // scene.add(ambientLight);

  // const directionalLight = new THREE.DirectionalLight("white", 1);
  // directionalLight.position.x = 1;
  // directionalLight.position.z = 2;
  // scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // CanvasTexture
  const texCanvas = document.createElement("canvas");
  const texContext = texCanvas.getContext("2d");

  texCanvas.width = 500;
  texCanvas.height = 500;

  const canvasTexture = new THREE.CanvasTexture(texCanvas);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 입체감이 없는 메테리얼 조명, 그림자의 영향을 받지 않는다. 처리가 필요없으므로 성능이 굉장히 좋음ㄴ
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    material.map.needsUpdate = true;

    texContext.fillStyle = "green";
    texContext.fillRect(0, 0, 500, 500);
    texContext.fillStyle = "white";
    texContext.fillRect(time * 50, 100, 50, 50);
    texContext.font = "bold 50px sans-serif";
    texContext.fillText("Hello", 200, 200);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
