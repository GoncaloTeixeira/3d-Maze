
        // Create the Three.js Scene
        var scene = new THREE.Scene();

        // Create a new Perspective Camera
        var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
        camera.position.z = 25;

        // Create a Full Screen WebGL Renderer
        var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setClearColor("#DDDDDD");
        renderer.setSize(window.innerWidth,window.innerHeight);

        document.body.appendChild(renderer.domElement);

        // Make sure the project is responsive based on window resizing
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth,window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.updateProjectionMatrix();
        })

        // Add a light
        var light = new THREE.PointLight(0xFFFFFF, 1.4, 1000)
        light.position.set(0,15,15);
        scene.add(light);

        // Defining a variable for our two models
        var ourObj;
        var ourObj2;

        // Create a material
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.mtl', function (materials) {

            materials.preload();

            // Load the object
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/glass.obj', function (object) {
                scene.add(object);
                ourObj = object;
                object.position.z -= 370;
                object.rotation.x = 250;

            });
        });

        // Create a material
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.mtl', function (materials) {

            materials.preload();

            // Load the object
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/center.obj', function (object) {
                scene.add(object);
                ourObj2 = object;
                object.position.z -= 70;
                object.rotation.x = 250;

                this.tl = new TimelineMax();
                this.tl.from(ourObj2.scale, 2, {y: 0, x:0, z: 0, ease: Expo.easeOut})
                this.tl.from(ourObj2.position, 2, {y: 0, z: -30,  ease: Expo.easeOut})
                this.tl.from(ourObj.scale, 2, {x: 1.5, y: 1.5, z: 0, ease: Expo.easeOut}, '-=2')
                this.tl.from(ourObj.position, 1, {y: -20, ease: Expo.easeOut}, '-=3')
            });
        });
        



        var render = function() {
            requestAnimationFrame(render);
            
            // Rotate the objects indefinitely
            ourObj.rotation.z -= .01;
            ourObj2.rotation.z += .03;

            renderer.render(scene, camera);
        }

        // Call this to render the entire scene
        render();