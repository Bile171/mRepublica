
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);

     function createScene() {
      var scene = new BABYLON.Scene(engine);
      setupMouseMovement(canvas,scene)
      //Adding an Arc Rotate Camera
      var camera = setupCamera(scene);
      let building;
      // The first parameter can be used to specify which mesh to import. Here we import all meshes
      BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Bile171/mRepublica/master/", "untitledX4_optimized.babylon", scene, function (newMeshes) {
      /*do something with the scene*/
        for(let i=0;i<newMeshes.length;i++){
          newMeshes[i].checkCollisions = true;
        }
      });
      scene.gravity = new BABYLON.Vector3(0, -0.11, 0);
      //Set gravity for the scene (G force like, on Y-axis)
      // Enable Collisions
      scene.collisionsEnabled = true;
      //setup lights

      var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(200, 200, 100), scene);
      var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 5,-6), scene);
      var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(6, 5, 3.5), scene);
      var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(20, -5, 20), scene);
      light.intensity = 000;
      light1.intensity = 15;
      light2.intensity = 5;
      // Move the light with the camera
      scene.registerBeforeRender(function () {
          light.position = camera.position;
      });

      // scene.debugLayer.show();

      return scene;
    }



    function setupMouseMovement(canvas,scene){
      //We start without being locked.
      var isLocked = false;
      // On click event, request pointer lock
      scene.onPointerDown = function (evt) {
        //true/false check if we're locked, faster than checking pointerlock on each single click.
        if (!isLocked) {
          canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
          if (canvas.requestPointerLock) canvas.requestPointerLock();
        }
        //continue with shooting requests or whatever :P
        if (evt === 0) castRay(); //(left mouse click) //evt === 1 (mouse wheel click (not scrolling)) //evt === 2 (right mouse click)
      };
      // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
      var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
        // If the user is already locked
        if (!controlEnabled) {
          //camera.detachControl(canvas);
          isLocked = false;
        } else {
          //camera.attachControl(canvas);
          isLocked = true;
        }
      };
      // Attach events to the document
      document.addEventListener("pointerlockchange", pointerlockchange, false);
      document.addEventListener("mspointerlockchange", pointerlockchange, false);
      document.addEventListener("mozpointerlockchange", pointerlockchange, false);
      document.addEventListener("webkitpointerlockchange", pointerlockchange, false);
    }


    function setupCamera(scene){
      var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -20), scene);
      camera.attachControl(canvas, true);
      //setup physics
      camera.applyGravity = true;
      camera.speed = .5;
      camera.angularSensibility = 4000;
      camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
      camera.checkCollisions = true;
      return camera
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });
});


// importar modelo
// aplicar texturas
// camera
// iluminação
// textura
// definir movimentos da camera
// renderizacao (normal_map, difuse... etc)
