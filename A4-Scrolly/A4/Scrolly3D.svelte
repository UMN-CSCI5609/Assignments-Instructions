<script lang="ts">
    import { Scroll } from "$lib";
    import * as THREE from "three";
    import { onMount } from "svelte";
    import { onWindowResize, loadModels } from "$lib/Helper-3D";

    let progress: number = $state(0);
    let threeJSContainer: HTMLElement;
    let camera: THREE.PerspectiveCamera; // The camera used to view the scene, typically a perspective camera for 3D rendering
    let scene: THREE.Scene; // The scene where all the objects are added
    let renderer: THREE.WebGLRenderer; // The renderer used to render the scene
    const FLOOR = -250; // The floor level of the scene

    const morphs: Array<THREE.Mesh> = []; // Array to store the morphs (animated models: horse, flamingo, parrot)
    let mixer: THREE.AnimationMixer; // The mixer used to animate the morphs

    const clock = new THREE.Clock(); // Clock to keep track of time for animations

    onMount(
        // // once the component mounts, initialize the Three.js scene
        () => {
            init(window.innerWidth * 0.6, window.innerHeight * 0.9);
        },
    );

    let hasAnimation = false;

    $effect(() => {
        // update the camera position based on the progress
        if (progress < 50) {
            camera.position.set(0, FLOOR + 200, 300 + progress * 20);
            if (hasAnimation) {
                renderer.setAnimationLoop(() => {
                    renderer.render(scene, camera);
                });
                hasAnimation = false;
            }
        } else if (!hasAnimation) {
            renderer.setAnimationLoop(animate);
            hasAnimation = true;
        }
    });

    function init(SCREEN_WIDTH: number, SCREEN_HEIGHT: number) {
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        threeJSContainer.appendChild(renderer.domElement);

        // Camera
        camera = new THREE.PerspectiveCamera(
            23,
            SCREEN_WIDTH / SCREEN_HEIGHT,
            10,
            3000,
        );
        camera.position.set(0, 50, 900);

        // Scene
        scene = new THREE.Scene();
        // scene.background = new THREE.Color(0x87ceeb); // Sky color (light blue)
        new THREE.TextureLoader().load("3d/sky.jpg", (texture) => {
            texture.repeat.set(0.8, 1); // repeat the texture
            scene.background = texture;
        });

        // Ambient Light
        const ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);

        // Directional Light
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(0, 1500, 1000);
        light.castShadow = true;
        Object.assign(light.shadow.camera, {
            top: 2000,
            bottom: -2000,
            left: -2000,
            right: 2000,
            near: 1200,
            far: 2500,
        });
        light.shadow.bias = 0.0001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 1024;
        scene.add(light);

        // Add ground
        // addGround(scene, FLOOR, "3d/grasslight-big.jpg");

        // Load Models
        const models = [
            {
                path: "3d/Flamingo.glb",
                speed: 350,
                duration: 1,
                x: 0,
                y: FLOOR + 250,
                z: 100,
                scale: 0.5,
            },
            {
                path: "3d/Flamingo.glb",
                speed: 350,
                duration: 1,
                x: -30,
                y: FLOOR + 200,
                z: 110,
                scale: 0.5,
            },
        ];

        mixer = loadModels(models, scene, mixer, morphs);

        // Handle resize
        window.addEventListener("resize", () =>
            onWindowResize(
                camera,
                renderer,
                window.innerWidth / 4,
                window.innerHeight / 2,
            ),
        );

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    function animate() {
        // this function will be called every frame
        const delta = clock.getDelta();
        mixer.update(delta);

        renderer.render(scene, camera);
        // controls.update(delta);
    }
</script>

<h2>The Scrolly element can also be used to control 3D Visualizations</h2>

<Scroll bind:progress>
    <!-- Story here -->

    <div class="threejsSection">
        <p>Scroll down in this div will move the camera of the scene.</p>
        <p>Once progress > 50, we will add animation to the Flamingo</p>
    </div>

    <div class="threejsSection">
        scroll down in this div will not move the camera of the scene.
    </div>

    <!-- Story here -->
    <svelte:fragment slot="viz">
        Progress: {progress.toFixed(2)}
        <div bind:this={threeJSContainer}></div>
    </svelte:fragment>
</Scroll>

<style>
    div.threejsSection {
        text-align: center;
        color: #666;
        height: 200vh; /* Make the div scrollable with a 200% view height */
        border: 2px solid #aaa;
        padding: 10px;
        margin: 10px;
    }
</style>
