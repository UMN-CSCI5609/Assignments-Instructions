<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { FontLoader, Font } from "three/addons/loaders/FontLoader.js";
    import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
    import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

    import { addGround, onWindowResize, loadModels } from "$lib/Helper-3D";

    import * as d3 from "d3";

    // tip: change the dummy data to the actual summer movies data
    type TDummyData = {
        [key: string]: number;
    };
    const dummyData = {
        comedy: 20,
        romance: 15,
        drama: 40,
    };

    // global variables for defining and controlling the 3D scene
    let container: HTMLElement; // The container element where the Three.js canvas will be added to the DOM
    // let controls: any; // Controls for interacting with the scene (e.g., camera controls like OrbitControls or PointerLockControls)
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
            // tip: when using real data to create the bars, you want to make sure the data is loaded before creating the bars.
            // use async/await to load the data before initializing the scene
            init(window.innerWidth, window.innerHeight);
        },
    );

    function init(SCREEN_WIDTH: number, SCREEN_HEIGHT: number) {
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        container.appendChild(renderer.domElement);

        // Camera
        camera = new THREE.PerspectiveCamera(
            23,
            SCREEN_WIDTH / SCREEN_HEIGHT,
            10,
            3000,
        );
        camera.position.set(0, 50, 1900);

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

        // // CONTROLS, the scene will move with the mouse

        // controls = new FirstPersonControls(camera, renderer.domElement);

        // controls.lookSpeed = 0.0125;
        // controls.movementSpeed = 500;
        // controls.lookVertical = true;
        // controls.lookAt(scene.position);

        // GROUND (Grass)
        // addGround(scene, FLOOR, "3d/Grass-Texture.jpg");
        addGround(scene, FLOOR, "3d/grasslight-big.jpg");

        // Add text and bars
        const fontLoader = new FontLoader();
        fontLoader.load("3d/helvetiker_bold.typeface.json", (font: Font) => {
            const textGeo = new TextGeometry("summer movies", {
                font: font,
                size: 40,
                depth: 15,
                // curveSegments: 2,
                // bevelThickness: 2,
                // bevelSize: 1,
                // bevelEnabled: true,
            });
            textGeo.computeBoundingBox();
            const centerOffset =
                -0.5 *
                (textGeo!.boundingBox!.max.x - textGeo!.boundingBox!.min.x);
            const textMaterial = new THREE.MeshStandardMaterial({
                color: 0x449900,
            });
            const titleMesh = new THREE.Mesh(textGeo, textMaterial);
            titleMesh.position.x = centerOffset;
            titleMesh.position.y = FLOOR + 500;
            titleMesh.castShadow = true;
            scene.add(titleMesh);

            createBars(scene, font, dummyData);
        });

        // Load Models
        const models = [
            {
                path: "3d/Horse.glb",
                speed: 300,
                duration: 1,
                x: 100 - Math.random() * 1000,
                y: FLOOR,
                z: 300,
                scale: 0.5,
            },
            {
                path: "3d/Horse.glb",
                speed: 300,
                duration: 1,
                x: 100 - Math.random() * 1000,
                y: FLOOR,
                z: 450,
                scale: 0.5,
            },
            {
                path: "3d/Flamingo.glb",
                speed: 350,
                duration: 1,
                x: 300 - Math.random() * 500,
                y: FLOOR + 550,
                z: 100,
                scale: 0.5,
            },
            {
                path: "3d/Flamingo.glb",
                speed: 350,
                duration: 1,
                x: 300 - Math.random() * 500,
                y: FLOOR + 550,
                z: 200,
                scale: 0.5,
            },
            {
                path: "3d/Parrot.glb",
                speed: 350,
                duration: 0.5,
                x: 500 - Math.random() * 500,
                y: FLOOR + 500,
                z: 700,
                scale: 0.5,
            },
        ];
        mixer = loadModels(models, scene, mixer, morphs);

        // Handle resize
        window.addEventListener("resize", () =>
            onWindowResize(
                camera,
                renderer,
                window.innerWidth,
                window.innerHeight,
            ),
        );

        renderer.setAnimationLoop(animate);
    }

    function createBars(scene: THREE.Scene, font: Font, dummyData: TDummyData) {
        const maxHeight = 400; // Maximum height of the bars
        const barMaxWidth = 400; // Maximum width of all bars

        const xScale = d3
            .scaleBand()
            .domain(Object.keys(dummyData))
            .range([-barMaxWidth / 2, barMaxWidth / 2])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, Math.max(...Object.values(dummyData).map((d) => d))])
            .range([0, maxHeight]);

        // Create bars for each genre
        Object.keys(dummyData).forEach((genre, i) => {
            const bar = createOneBar(
                yScale(dummyData[genre]),
                xScale.bandwidth(),
            );
            bar.position.set(
                xScale(genre),
                FLOOR + yScale(dummyData[genre]) / 2,
                0,
            );
            scene.add(bar);

            addLabelToBar(
                scene,
                `${genre}: ${dummyData[genre]}`,
                xScale(genre)! - xScale.bandwidth() / 2,
                FLOOR + 5,
                bar.position.z + xScale.bandwidth(),
                font,
            );
        });
    }

    function createOneBar(height: number, width: number) {
        // const geometry = new THREE.BoxGeometry(width, height, width);

        const geometry = new THREE.CylinderGeometry(
            width / 2,
            width / 2,
            height,
            32,
        ); // cylinder

        // const material = new THREE.MeshPhongMaterial({ color: color }); // can be either custom color or texture
        const material = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load("./3d/wood-texture.jpg"),
        });
        const bar = new THREE.Mesh(geometry, material);
        bar.castShadow = true;
        bar.receiveShadow = true;
        return bar;
    }

    function addLabelToBar(
        scene: THREE.Scene,
        text: string,
        x: number,
        y: number,
        z: number,
        font: Font,
    ) {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 12,
            depth: 4,
        });

        const textMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
        }); // Three.js provide a list of mesh materials, you can choose the one you like
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text above the bar
        textMesh.position.set(x, y, z);
        textMesh.castShadow = true;
        textMesh.receiveShadow = false; // Text will not receive shadow to make it more readable

        scene.add(textMesh);
    }

    function animate() {
        // this function will be called every frame
        const delta = clock.getDelta();
        mixer.update(delta);

        // You can comment out the following lines if you don't want the morphs to move, which will also save some computation
        morphs.forEach((morph) => {
            morph.position.x += morph.speed * delta;
            // Reset position if it goes off screen
            if (morph.position.x > window.innerWidth / 2) {
                morph.position.x = -window.innerWidth / 2 - Math.random() * 200;
            }
        });

        renderer.render(scene, camera);
        // controls.update(delta);
    }
</script>

<div bind:this={container} class="container"></div>

<style>
    div.container {
        width: 100%;
        height: 100%;
    }
</style>
