//Create states para ver fps e tempo de renderização
function createStats() {
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '10';
    stats.domElement.style.top = '10';

    return stats;
  }

 



 



document.addEventListener('DOMContentLoaded', LoadLabirinto);
document.getElementById("RestartBut").onclick = function() {Restart()};

document.getElementById("Cima").onclick = function() {ButCima()};
document.getElementById("Esq").onclick = function() {ButEsq()};
document.getElementById("Dir").onclick = function() {ButDir()};
document.getElementById("Baixo").onclick = function() {ButBaixo()};
document.getElementById("Change Camera").onclick = function(){ ButCameraChange()};


function ScreenSize(){
    console.log(window.innerWidth);
    if ((window.innerWidth)>1000 ){
        document.getElementById("Control-Mobile").style.visibility = "hidden";
        // document.getElementById("Cima").style.visibility = "hidden";
        // document.getElementById("Esq").style.visibility = "hidden";
        // document.getElementById("Dir").style.visibility = "hidden";
        // document.getElementById("Baixo").style.visibility = "hidden";
        // document.getElementById("Change Camera").style.visibility = "hidden";
    }else{
        document.getElementById("Control-Mobile").style.visibility = "visible";
    }
}


function ButCameraChange(){
    if(LookAux==1){
        ambientLight.intensity=0.001;
        LookAux=0;
        animate();
    }else{
        ambientLight.intensity=0.1;
        LookAux=1;
        animateCenter();
    }
}

function ButCima(){
    Cima();
}

function ButBaixo(){
    Baixo();
}

function ButEsq(){
    Esquerda();
}

function ButDir(){
    Direita();
}







//Evento para mover a bola num telemovel














        //cena
        var cena = new THREE.Scene();
        cena.background = new THREE.Color(0x000000);
        var hlight = new THREE.AmbientLight (0xffffff,1);
        //cena.add(hlight);
        //console.log(hlight);

        //camara Perspetiva 
        var camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight,1,5000);
        
        camera.rotation.y=100/180*Math.PI;
        camera.position.x=800;
        camera.position.y=100;
        camera.position.z=1000;
         
        
        
        
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        
     
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
                renderer.setSize(window.innerWidth,window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                
            })
        




        
        
        

        // Luz direcional
        directionalLight = new THREE.DirectionalLight(0xFFFFff,0.1);
        directionalLight.position.set(100,10000,100);
        directionalLight.castShadow =true;
        //cena.add(directionalLight);


        //point Light

        var light= new THREE.PointLight(0xffffff,0.8,80);
        light.position.set(-100,10,100);
        cena.add(light);

        light2= new THREE.PointLight(0xc4c4c4,1);
        light2.position.set(0,50,0);
        //cena.add(light2);

        light3= new THREE.PointLight(0xc4c4c4,100);
        light3.position.set(0,100,-500);
        //cena.add(light3);

        light4= new THREE.PointLight(0xc4c4c4,100);
        light4.position.set(-500,300,0);
        //cena.add(light4);


         var ambientLight = new THREE.AmbientLight( 0xffffff, 0.001 );
         cena.add( ambientLight );

        





        //implementar controlos do rato OrbitControls

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener( 'mousedown', renderer);








       var model;
    

        //Implemetar imagem
        

 





        
        
    


     // requestAnimationFrame(update);
function animate(){
    
    camera.lookAt(sphere.position);
    
    renderer.render(cena,camera);
    requestAnimationFrame(animate);

}

function animateCenter(){
    //var cameraO = new THREE.OrthographicCamera(window.innerWidth / - 15, window.innerWidth / 15,window.innerHeight / 5, window.innerHeight / - 5, -100, 500 );
    var cameraO = new THREE.OrthographicCamera(-120,120,110,-110, -120, 500 );
    cameraO.position.x = 0;
    cameraO.position.y = 0.5;
    cameraO.position.z = 0;
    cameraO.lookAt(center);
    renderer.render(cena,cameraO);
    requestAnimationFrame(animateCenter);

}

 function update(){

     //cubo.rotation.x += 0.02;
    
    // renderer.render(cena, camera );

     //Console.log();
     //requestAnimationFrame(update);
     //loader.AnimationClip(1,1,1,1);
    
 }


 
    //Adicionar Esfera

    var geometry = new THREE.SphereGeometry( 2, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.y=5;
    sphere.position.z=95;
    sphere.position.x=-95;

    cena.add( sphere );
    //descomentar

     //camera.position.x=(sphere.position.x -180) ;
     //camera.position.y=(sphere.position.y +100) ;
     //camera.position.z=(sphere.position.z +30) ;
    
    //renderer.render( cena, camera );
//
//Labirinto
//



function detectCollisionCubes(object1, object2){
    object1.geometry.computeBoundingBox(); //not needed if its already calculated
    object2.geometry.computeBoundingBox();
    object1.updateMatrixWorld();
    object2.updateMatrixWorld();
    
    var box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);
  
    var box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);
    //console.log(box1.intersectsBox(box2));
    return box1.intersectsBox(box2);
}

var Walls;
var stats;
var Title;
var loader = new THREE.FontLoader();
function LoadLabirinto(){

    ScreenSize();

  

loader.load( 'fonts/optimer_regular.typeface.json', function ( font ) {

	var geometry = new THREE.TextGeometry( "3D Maze", {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 20,
		bevelSize: 8,
		bevelOffset: 0,
        bevelSegments: 5
       
    } );
    var TitleMaterial= new THREE.MeshBasicMaterial({color:0x00ffff})
    Title = new THREE.Mesh(geometry,TitleMaterial);
    Title.position.y=100;
    Title.position.x=-120;
    
    cena.add(Title);
   
} );


    

    //Base do Labirinto
    var material = new THREE.MeshPhongMaterial( { color: 0x00ffff } );
    
    var geometry = new THREE.BoxBufferGeometry(200,1,200);
    var Floor = new THREE.Mesh(geometry,material);
    cena.add( Floor );

    // Adicionar Inicio e fim de jogo
    var material2 = new THREE.MeshBasicMaterial( { color: 0x6cf03c } );
    var geometry2 = new THREE.BoxBufferGeometry(10,1.1,10);
    var Floor2 = new THREE.Mesh(geometry2,material2);
    Floor2.position.x=-95;
    Floor2.position.z=95;
    cena.add(Floor2);

    var material2 = new THREE.MeshBasicMaterial( { color: 0xc20e0e } );
    Floor2 = new THREE.Mesh(geometry2,material2);
    Floor2.position.x=95;
    Floor2.position.z=-95;
    cena.add(Floor2);




    //Paredes envolventes
    //var WallMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var WallMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
   
    var WallGeometry = new THREE.BoxBufferGeometry(200,10,1);

        //Parede 01
        var Wall = new THREE.Mesh(WallGeometry,WallMaterial);
        Wall.position.z=100;
        Wall.position.y=4;
        cena.add(Wall);

        //Parede 02
        var Wall2 = new THREE.Mesh(WallGeometry,WallMaterial);
        Wall2.position.z=-100;
        Wall2.position.y=4;
        cena.add(Wall2);

        //Parede 03
        var Wall3 = new THREE.Mesh(WallGeometry,WallMaterial);
        Wall3.position.z=0;
        Wall3.position.y=4;
        Wall3.position.x=100;
        Wall3.rotation.y=Math.PI/2;
        cena.add(Wall3);

        //Parede 04
        var Wall4 = new THREE.Mesh(WallGeometry,WallMaterial);
        Wall4.position.z=0;
        Wall4.position.y=4;
        Wall4.position.x=-100
        Wall4.rotation.y=Math.PI/2;
        cena.add(Wall4);




        //Paredes para o labirinto
        var WallMaterial2= new THREE.MeshPhongMaterial( { color: 0x000000 } );

        // geometria de 100
        var WallGeometry100 = new THREE.BoxBufferGeometry(100,10,1);
        // geometria de 75
        var WallGeometry75 = new THREE.BoxBufferGeometry(75,10,1);
        // geometria de 50 
        var WallGeometry50 = new THREE.BoxBufferGeometry(50,10,1);
        // geometria de 40 
        var WallGeometry40 = new THREE.BoxBufferGeometry(40,10,1);
        // geomtria de 30 
        var WallGeometry30 = new THREE.BoxBufferGeometry(30,10,1);
        // geomtria de 25 
        var WallGeometry25 = new THREE.BoxBufferGeometry(25,10,1);
        // geomtria de 20 
        var WallGeometry20 = new THREE.BoxBufferGeometry(20,10,1);
        // geomtria de 10 
        var WallGeometry10 = new THREE.BoxBufferGeometry(10,10,1);

        var Wall5 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall5.position.z=90;
        Wall5.position.y=5;
        Wall5.position.x=-62;
        cena.add(Wall5);

        var Wall6 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall6.position.z=80;
        Wall6.position.y=5;
        Wall6.position.x=-77;
        cena.add(Wall6);

        var Wall7 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall7.position.z=70;
        Wall7.position.y=5;
        Wall7.position.x=-25;
        cena.add(Wall7);

        var Wall8 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall8.position.z=60;
        Wall8.position.y=5;
        Wall8.position.x=49;
        cena.add(Wall8);

        var Wall9 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall9.position.z=50;
        Wall9.position.y=5;
        Wall9.position.x=-25;
        cena.add(Wall9);

        var Wall10 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall10.position.z=40;
        Wall10.position.y=5;
        Wall10.position.x=-65;
        cena.add(Wall10);

        var Wall11 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall11.position.z=40;
        Wall11.position.y=5;
        Wall11.position.x=35;
        cena.add(Wall11);

        var Wall12 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall12.position.z=30;
        Wall12.position.y=5;
        Wall12.position.x=-15;
        cena.add(Wall12);

        var Wall13 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall13.position.z=20;
        Wall13.position.y=5;
        Wall13.position.x=-25;
        cena.add(Wall13);

        var Wall14 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall14.position.z=10;
        Wall14.position.y=5;
        Wall14.position.x=30;
        cena.add(Wall14);

        var Wall15 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall15.position.z=0;
        Wall15.position.y=5;
        Wall15.position.x=-40;
        cena.add(Wall15);

        var Wall16 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall16.position.z=-10;
        Wall16.position.y=5;
        Wall16.position.x=-35;
        cena.add(Wall16);

        var Wall17 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall17.position.z=-10;
        Wall17.position.y=5;
        Wall17.position.x=25;
        cena.add(Wall17);

        var Wall18 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall18.position.z=-20;
        Wall18.position.y=5;
        Wall18.position.x=-50;
        cena.add(Wall18);

        var Wall19 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall19.position.z=-30;
        Wall19.position.y=5;
        Wall19.position.x=40;
        cena.add(Wall19);

        var Wall20 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall20.position.z=-40;
        Wall20.position.y=5;
        Wall20.position.x=50;
        cena.add(Wall20);

        var Wall21 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall21.position.z=-40;
        Wall21.position.y=5;
        Wall21.position.x=-40;
        cena.add(Wall21);

        var Wall22 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall22.position.z=-50;
        Wall22.position.y=5;
        Wall22.position.x=-30;
        cena.add(Wall22);

        var Wall23 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall23.position.z=-60;
        Wall23.position.y=5;
        Wall23.position.x=15;
        cena.add(Wall23);

        var Wall24 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall24.position.z=-70;
        Wall24.position.y=5;
        Wall24.position.x=50;
        cena.add(Wall24);

        var Wall25 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall25.position.z=-80;
        Wall25.position.y=5;
        Wall25.position.x=-50;
        cena.add(Wall25);

        var Wall26 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall26.position.z=-80;
        Wall26.position.y=5;
        Wall26.position.x=87;
        cena.add(Wall26);

        var Wall27 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall27.position.z=-90;
        Wall27.position.y=5;
        Wall27.position.x=50;
        cena.add(Wall27);

        var Wall28 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall28.position.z=-90;
        Wall28.position.y=5;
        Wall28.position.x=-87;
        cena.add(Wall28);

        var Wall29 = new THREE.Mesh(WallGeometry75,WallMaterial2);
        Wall29.position.z=90;
        Wall29.position.y=5;
        Wall29.position.x=55;
        cena.add(Wall29);

        var Wall30 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall30.position.z=80;
        Wall30.position.y=5;
        Wall30.position.x=25;
        cena.add(Wall30);

        var Wall31 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall31.position.z=50;
        Wall31.position.y=5;
        Wall31.position.x=65;
        cena.add(Wall31);

        var Wall32 = new THREE.Mesh(WallGeometry100,WallMaterial2);
        Wall32.position.z=0;
        Wall32.position.y=5;
        Wall32.position.x=50;
        cena.add(Wall32);

        var Wall33 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall33.position.z=-20;
        Wall33.position.y=5;
        Wall33.position.x=60;
        cena.add(Wall33);

        var Wall34 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall34.position.z=-70;
        Wall34.position.y=5;
        Wall34.position.x=0;
        cena.add(Wall34);

        var Wall35 = new THREE.Mesh(WallGeometry25,WallMaterial2);
        Wall35.position.z=30;
        Wall35.position.y=5;
        Wall35.position.x=-87;
        cena.add(Wall35);

        var Wall36 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall36.position.z=-30;
        Wall36.position.y=5;
        Wall36.position.x=-75;
        cena.add(Wall36);

    // Paredes Transversais
        var Wall50 = new THREE.Mesh(WallGeometry20,WallMaterial2);
        Wall50.position.z=80;
        Wall50.position.y=5;
        Wall50.position.x=75;
        Wall50.rotation.y=Math.PI/2;
        cena.add(Wall50);

        var Wall51 = new THREE.Mesh(WallGeometry50,WallMaterial2);
        Wall51.position.z=55;
        Wall51.position.y=5;
        Wall51.position.x=-90;
        Wall51.rotation.y=Math.PI/2;
        cena.add(Wall51);

        var Wall52 = new THREE.Mesh(WallGeometry20,WallMaterial2);
        Wall52.position.z=30;
        Wall52.position.y=5;
        Wall52.position.x=25;
        Wall52.rotation.y=Math.PI/2;
        cena.add(Wall52);

        var Wall53 = new THREE.Mesh(WallGeometry20,WallMaterial2);
        Wall53.position.z=0;
        Wall53.position.y=5;
        Wall53.position.x=-10;
        Wall53.rotation.y=Math.PI/2;
        cena.add(Wall53);

        var Wall54 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall54.position.z=65;
        Wall54.position.y=5;
        Wall54.position.x=25;
        Wall54.rotation.y=Math.PI/2;
        cena.add(Wall54);

        var Wall55 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall55.position.z=45;
        Wall55.position.y=5;
        Wall55.position.x=60;
        Wall55.rotation.y=Math.PI/2;
        cena.add(Wall55);

        var Wall56 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall56.position.z=5;
        Wall56.position.y=5;
        Wall56.position.x=80;
        Wall56.rotation.y=Math.PI/2;
        cena.add(Wall56);

        var Wall57 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall57.position.z=-15;
        Wall57.position.y=5;
        Wall57.position.x=50;
        Wall57.rotation.y=Math.PI/2;
        cena.add(Wall57);

        var Wall58 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall58.position.z=15;
        Wall58.position.y=5;
        Wall58.position.x=-20;
        Wall58.rotation.y=Math.PI/2;
        cena.add(Wall58);

        var Wall59 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall59.position.z=-15;
        Wall59.position.y=5;
        Wall59.position.x=0;
        Wall59.rotation.y=Math.PI/2;
        cena.add(Wall59);

        var Wall60 = new THREE.Mesh(WallGeometry20,WallMaterial2);
        Wall60.position.z=-40;
        Wall60.position.y=5;
        Wall60.position.x=12;
        Wall60.rotation.y=Math.PI/2;
        cena.add(Wall60);

        var Wall61 = new THREE.Mesh(WallGeometry20,WallMaterial2);
        Wall61.position.z=-70;
        Wall61.position.y=5;
        Wall61.position.x=-22;
        Wall61.rotation.y=Math.PI/2;
        cena.add(Wall61);

        var Wall62 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall62.position.z=-75;
        Wall62.position.y=5;
        Wall62.position.x=74;
        Wall62.rotation.y=Math.PI/2;
        cena.add(Wall62);

        var Wall63 = new THREE.Mesh(WallGeometry20,WallMaterial2);
        Wall63.position.z=-80;
        Wall63.position.y=5;
        Wall63.position.x=12;
        Wall63.rotation.y=Math.PI/2;
        cena.add(Wall63);

        var Wall64 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall64.position.z=-85;
        Wall64.position.y=5;
        Wall64.position.x=-75;
        Wall64.rotation.y=Math.PI/2;
        cena.add(Wall64);

        var Wall65 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall65.position.z=-85;
        Wall65.position.y=5;
        Wall65.position.x=87;
        Wall65.rotation.y=Math.PI/2;
        cena.add(Wall65);

        var Wall66 = new THREE.Mesh(WallGeometry30,WallMaterial2);
        Wall66.position.z=-55;
        Wall66.position.y=5;
        Wall66.position.x=65;
        Wall66.rotation.y=Math.PI/2;
        cena.add(Wall66);

        var Wall67 = new THREE.Mesh(WallGeometry10,WallMaterial2);
        Wall67.position.z=85;
        Wall67.position.y=5;
        Wall67.position.x=-25;
        Wall67.rotation.y=Math.PI/2;
        cena.add(Wall67);

    //console.log(Floor);
    
    Walls = [Wall,Wall2,Wall3,Wall4,Wall5,Wall6,Wall7,Wall8,Wall9,Wall10,Wall11,Wall12,Wall13,Wall14,Wall15,Wall16,Wall17,Wall18,Wall19,
        Wall20,Wall21,Wall22,Wall23,Wall24,Wall25,Wall26,Wall27,Wall28,Wall29,Wall30,Wall31,Wall32,Wall33,Wall34,Wall35,Wall36,Wall50,
        Wall51,Wall52,Wall53,Wall54,Wall55,Wall56,Wall57,Wall58,Wall59,Wall60,Wall61,Wall62,Wall63,Wall64,Wall65,Wall66,Wall67];

    renderer.render( cena, camera );
    animateTitle();
    //console.log(camera);
    //requestAnimationFrame(LoadLabirinto);
}




//Vetor direção da camera
var direction = new THREE.Vector3();
var center = new THREE.Vector3(0,0,0);
center.x=0;
center.y=0;
center.z=0;

var LookAux= 0;


document.addEventListener('keydown', ev=>{
    cena.remove(Title);
   //Get diretion of camera 
    camera.getWorldDirection( direction );
    light.position.set(sphere.position.x,50,sphere.position.z);
    //light.set();





    //  Tecla Q
    if(ev.keyCode ==81){
        if(LookAux==1){
            ambientLight.intensity=0.001;
            LookAux=0;
            animate();
            
        }else if(LookAux==0){
            ambientLight.intensity=0.1;
            Peeks+=1;
            document.getElementById('PeeksVal').innerHTML=Peeks.toString();
            LookAux=1;
            animateCenter();
            
        }
        
    
    }
    if(LookAux ==0){
   // Tecla W
    if(ev.keyCode == 87){
        
        Cima();
        
       }
           
    //Tecla S
    if(ev.keyCode == 83){
    
       Baixo();
        
    }


    //Tecla D
    if(ev.keyCode == 68){
       
    Direita();
    }
    //Tecla A
    if(ev.keyCode == 65){
        

        Esquerda();

    }
     
    }
   
   
   
   
   
   
   
});




function Cima(){
    //Get diretion of camera 
    camera.getWorldDirection( direction );
    light.position.set(sphere.position.x,50,sphere.position.z);
    //light.set();
    
    if ((Math.abs(direction.z))>(Math.abs(direction.x))){
        if(direction.z<=0){
           sphere.position.z -= 2;
           //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z += 2;
            }
            });
        }
        else{    
        sphere.position.z += 2;
        //voltar movimento prq colidiu
        Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z -= 2;
            }
            });
        }
    }else{
        if(direction.x<=0){
            sphere.position.x -= 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x += 2;
            }
            });
        }else{
            sphere.position.x += 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x -= 2;
            }
            });
            }
    }
    //Verificar se Ganhou
    VerificarSeGanhou();
}



function Baixo(){
    //Get diretion of camera 
    camera.getWorldDirection( direction );
    light.position.set(sphere.position.x,50,sphere.position.z);
    //light.set();
    if ((Math.abs(direction.z))>(Math.abs(direction.x))){
        if(direction.z<=0){
           sphere.position.z += 2;
           //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z -= 2;
            }
            });
        }
        else{    
        sphere.position.z -= 2;
        //voltar movimento prq colidiu
        Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z += 2;
            }
            });
        }
    }else{
        if(direction.x<=0){
            sphere.position.x += 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x -= 2;
            }
            });
        }else{
            sphere.position.x -= 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x += 2;
            }
            });
            }
    }
//Verificar se Ganhou
VerificarSeGanhou();
}



function Direita(){

    //Get diretion of camera 
    camera.getWorldDirection( direction );
    light.position.set(sphere.position.x,50,sphere.position.z);
    //light.set();
    if ((Math.abs(direction.z))>(Math.abs(direction.x))){
        if(direction.z<=0){
           sphere.position.x += 2;
           //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x -= 2;
            }
            });
        }
        else{    
        sphere.position.x -= 2;
        //voltar movimento prq colidiu
        Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x += 2;
            }
            });
        }
    }else{
        if(direction.x<=0){
            sphere.position.z -= 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z += 2;
            }
            });
        }else{
            sphere.position.z += 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z -= 2;
            }
            });
            }
    }
     //Verificar se Ganhou
     VerificarSeGanhou();
}


function Esquerda(){
    //Get diretion of camera 
    camera.getWorldDirection( direction );
    light.position.set(sphere.position.x,50,sphere.position.z);
    //light.set();
    if ((Math.abs(direction.z))>(Math.abs(direction.x))){
        if(direction.z<=0){
           sphere.position.x -= 2;
           //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x += 2;
            }
            });
        }
        else{    
        sphere.position.x += 2;
        //voltar movimento prq colidiu
        Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.x -= 2;
            }
            });
        }
    }else{
        if(direction.x<=0){
            sphere.position.z += 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z -= 2;
            }
            });
        }else{
            sphere.position.z -= 2;
            //voltar movimento prq colidiu
           Walls.forEach(element => {
            if(detectCollisionCubes(sphere,element)){
            sphere.position.z += 2;
            }
            });
            }
    
    }
     //Verificar se Ganhou
     VerificarSeGanhou();
}


//Numero de vezes que utilizou a camera ortogonal para verificar o caminho  
var Peeks =-1;
//Numero de vezes que terminou o labirinto com sucesso 
var Score=0;
//variavel para verrificar se ganhou
var Victory=0; 
function Restart(){
    sphere.position.y=5;
    sphere.position.z=95;
    sphere.position.x=-95;
    cena.remove(hlight);
    cena.remove(ObjetoImportado);
    LookAux=0;
    Peeks=0;
    if(Victory==1){
        
    }else{
        Score-=1; 
    }
    Victory=0;   
    document.getElementById('PeeksVal').innerHTML=Peeks.toString(); 

    document.getElementById("ScoreVal").innerHTML=Score;
    light.position.set(sphere.position.x,50,sphere.position.z);
    animate();
 }


 var mixerAnimacao;
 var relogio = new THREE.Clock();
 var ObjetoImportado;
 function VerificarSeGanhou(){
      //Verificar se Ganhou
    if(sphere.position.x>=90&&sphere.position.x<=100 && sphere.position.z<=-90&&sphere.position.z>=-100){
        Score+=1;
        Victory=1;
        document.getElementById('ScoreVal').innerHTML=Score.toString(); 
        LookAux=2;

 
        
        
        var importer = new THREE.FBXLoader()

        importer.load('blend/Samba Dancing.fbx',function (object){
            mixerAnimacao = new THREE.AnimationMixer(object);
            var action = mixerAnimacao.clipAction(object.animations[0]);
            action.play();

            object.traverse(function(child){
                if(child.isMesh){
                child.castShadow =true;
                child.receiveShadow =true;
            }
            });
            var TitleMaterial= new THREE.MeshBasicMaterial({color:0x00ffff})
            //anime = new THREE.Mesh(object,TitleMaterial);
            cena.add(object);
            object.scale.x=1;
            object.scale.y=1;
            object.scale.z=1;

            object.position.y= 10;
            console.log(object.position);
            ObjetoImportado=object;
        });
        cena.add(hlight);
        
        AnimateCelebration();
 }
}

 function AnimateCelebration(){
     if(mixerAnimacao){
         mixerAnimacao.update(relogio.getDelta());
     }
     
     camera.lookAt(0,100,0);
     renderer.render(cena,camera);
     requestAnimationFrame(AnimateCelebration);
 }

 function animateTitle(){


        camera.lookAt(100,100,0);
      
        renderer.render(cena,camera);
        requestAnimationFrame(animateTitle);
   
 }