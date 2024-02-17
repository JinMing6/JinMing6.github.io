import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class Scene {
  el;
  width;
  height;
  scene;
  camera;
  renderer;
  cube;
  clock = new THREE.Clock();
  composer;

  constructor(options) {
    this.el = options.el;
    this.parentElement = options.parentElement;
    this.width = this.parentElementRect.width;
    this.height = this.parentElementRect.width;
    this.init();
  }
  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 1.2;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 0.3;
    bloomPass.radius = 0;
    this.composer.addPass(bloomPass);
    this.composer.addPass(new OutputPass());
    this.el.appendChild(this.renderer.domElement);
    this.loadModel();
    this.animate();
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  }
  destroy() {
    window.removeEventListener('resize', this.onWindowResize);
  }
  onWindowResize() {
    const newWidth = this.parentElementRect.width;
    const newHeight = newWidth;
    this.camera.aspect = newWidth / newHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(newWidth, newHeight);
    this.composer.setSize(newWidth, newHeight);
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.composer.render();
  }
  loadModel() {
    const loader = new GLTFLoader();
    loader.load(
      '/model/blackhole/scene.gltf',
      (gltf) => {
        const modelScene = gltf.scene;
        const animations = gltf.animations;

        modelScene.position.set(0, 0.1, -0.8);
        modelScene.rotation.set(0.1, 0, 0);
        this.scene.add(modelScene);
        const mixer = new THREE.AnimationMixer(modelScene);
        animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.loop = THREE.LoopRepeat;
          action.timeScale = 0.1;
          action.play();
        });
        const animate = () => {
          requestAnimationFrame(animate);
          mixer.update(this.clock.getDelta());
        };
        animate();
      },
      undefined,
      (err) => {
        console.log(err);
      }
    );
  }
  get parentElementRect() {
    return this.parentElement.getBoundingClientRect();
  }
}
