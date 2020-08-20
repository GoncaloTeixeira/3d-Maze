document.addEventListener('DOMContentLoaded', Start);


        //cena
        var cena = new THREE.Scene();
        cena.background = new THREE.Color(0xE9DF21);
        var hlight = new THREE.AmbientLight (0x404040,100);
        cena.add(hlight);
        console.log(hlight);

        //camara
        var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight,1,5000);
        camera.rotation.y=45/180*Math.PI;
        camera.position.x=800;
        camera.position.y=100;
        camera.position.z=1000;
        
        
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        
          window.addEventListener('resize', () => {
          renderer.setSize(window.innerWidth,window.innerHeight);
          camera.aspect = (window.innerWidth / window.innerHeight);

          camera.updateProjectionMatrix();
          });

        document.body.appendChild(renderer.domElement);


        // Luz direcional
        directionalLight = new THREE.DirectionalLight(0xFFFFFF,100);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow =true;
        cena.add(directionalLight);









       //var model;
    
var loader = new THREE.GLTFLoader();
      

function Start() { 
   
  //Implemetar imagem
  


  loader.load('blend/Car/scene.gltf',
  // called when the resource is loaded
function ( gltf ) {
  //model = gltf.scene;
  //gltf.scene.scale.set(0.5,0.5,0.5);
  cena.add( gltf.scene );
  
  console.log(gltf.scene);
  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object
  
  //animate();
  }
);
}
    
