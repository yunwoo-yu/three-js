import * as THREE from "three";

export default function example() {
  // JS로 동적 캔버스 생성
  // const renderer = new THREE.WebGLRenderer();

  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // PerspectiveCamera (원근 카메라)
  // 가장 널리 쓰이는 카메라, 사람의 눈으로 보는 방식을 모형화 (시야각, 종횡비, 근접보이는 영역, 원거리보이는 영역)
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 카메라 위치 설정 z = 직선거리, x = 좌우, y = 상하
  camera.position.x = 1;
  camera.position.z = 5;
  camera.position.y = 2;

  // OrthographicCamera (직교 카메라)
  // const camera = new THREE.OrthographicCamera(
  //   -(window.innerWidth / window.innerHeight), // left
  //   window.innerWidth / window.innerHeight, // right
  //   1, // top
  //   -1, // bottom
  //   0.1, // near
  //   1000 // far
  // );

  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 10;
  // camera.lookAt(0, 0, 0);
  // camera.zoom = 0.5;
  // camera.updateProjectionMatrix();

  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, meterial);

  scene.add(mesh);

  renderer.render(scene, camera);
}
