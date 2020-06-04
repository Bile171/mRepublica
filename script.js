window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var createScene = function () {
        var scene = new BABYLON.Scene(engine);

        //Adding a light
        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

        //Adding an Arc Rotate Camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, false);

        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        // BABYLON.SceneLoader.ImportMesh("", "scenes/", "skull.babylon", scene, function (newMeshes) {
        //     // Set the target of the camera to the first imported mesh
        //
        // });
        BABYLON.SceneLoader.Load("/assets/", "Brutal.json", engine, function (scene) {
          camera.target = newMeshes[0];
       // do something with the scene
        });
        // Move the light with the camera
        scene.registerBeforeRender(function () {
            light.position = camera.position;
        });

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function () {
        scene.render();
    });
});


// importar modelo
// camera
// iluminação
// textura
// definir movimentos da camera
// renderizacao (normal_map, difuse... etc)
// física

