# gl-layer

A minimal 3D WebGL2 library.

## Getting Started

```JavaScript
import { Clock, Renderer, PerspectiveCamera, Transform, Mesh, Geometry, Program, Attribute, Vector3 } from 'gl-layer';

const clock = new Clock();

const renderer = new Renderer();

const vert = `#version 300 es
    layout (location = 0) in vec3 position;
    layout (location = 1) in vec3 normal;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;
    uniform mat3 normalMatrix;

    out vec3 vNormal;

    void main() {
        vNormal = normalMatrix * normal;
        gl_Position = projection * view * model * vec4(position, 1.0);
    }
`;

const frag = `#version 300 es
    precision mediump float;

    in vec3 vNormal;

    out vec4 fragColor;

    void main() {
        fragColor = vec4(vNormal, 1.0);
    }
`;

const scene = new Transform();

const camera = new PerspectiveCamera(45, renderer.width / renderer.height, 1, 1000);
camera.position = new Vector3(0, 0, 10);

const position = Attribute.from([
    -1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,

    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,

    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,

     1.0,  1.0,  1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    -1.0, -1.0, -1.0,

    -1.0,  1.0, -1.0,
     1.0,  1.0 , 1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
], 3);

const normal = Attribute.from([
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0, 
     0.0,  0.0, -1.0, 
     0.0,  0.0, -1.0, 
     0.0,  0.0, -1.0, 
     0.0,  0.0, -1.0, 

     0.0,  0.0, 1.0,
     0.0,  0.0, 1.0,
     0.0,  0.0, 1.0,
     0.0,  0.0, 1.0,
     0.0,  0.0, 1.0,
     0.0,  0.0, 1.0,

    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,

     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0
], 3);

const geometry = new Geometry(position, normal);

const program = new Program(vert, frag);

const mesh = new Mesh(geometry, program);
scene.add(mesh);

function render() {
    mesh.rotation.x = clock.time;
    mesh.rotation.y = clock.time;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();
```
