import * as THREE from "three";
// import { GLTFLoader } from "three/addons";
import { GamepadUtils } from "./gamepad";
import { SCALE } from "./values";

export class Game {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private plane: THREE.Object3D<THREE.Object3DEventMap> | null = null;
  private gamepadUtils = new GamepadUtils();

  public constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    window.addEventListener("resize", this._resize.bind(this));
    this._resize();
    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.plane = new THREE.Mesh(geometry, material);
    this.scene.add(this.plane);

    // const gltfLoader = new GLTFLoader();
    // const url = "/plane.gltf";
    // gltfLoader.load(url, (gltf) => {
    //   const root = gltf.scene;
    //   this.scene.add(root);
    //   this.plane = root;
    //   this._animate();
    // });

    this.camera.position.z = 5;
    this._animate();
  }

  private _animate() {
    requestAnimationFrame(this._animate.bind(this));

    const {
      leftAxes: [lx, ly],
      rightAxes: [rx, ry],
    } = this.gamepadUtils;

    this.plane!.position.y += ly * SCALE;
    this.plane?.rotateY(-lx * SCALE);
    this.plane?.rotateX(ry * SCALE);
    this.plane?.rotateZ(-rx * SCALE);

    this.renderer.render(this.scene, this.camera);
  }
  private _resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
