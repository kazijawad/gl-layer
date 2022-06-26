# gl-layer

A minimal WebGL2 3D library.

## Getting Started

```JavaScript
import { Renderer, Transform, Mesh, Geometry, Program, Vector2Array, Vector3, Clock } from 'gl-layer';

const clock = new Clock();

const renderer = new Renderer();

const vert = `#version 300 es
    layout (location = 0) in vec4 position;

    void main() {
        gl_Position = position;
    }
`;

const frag = `#version 300 es
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;

    out vec4 fragColor;

    void main() {
        fragColor = vec4(vec3(sin(uTime), 0.5, cos(uTime)) * uColor, 1.0);
    }
`;

const scene = new Transform();

const geometry = new Geometry(new Vector2Array([-0.50, -0.50, 0, 0.50, 0.50, -0.50]));

const program = new Program(vert, frag);
program.setUniform('uColor', new Vector3(1.0, 1.0, 1.0));
program.setUniform('uTime', clock.time);

const mesh = new Mesh(geometry, program);
scene.add(mesh);

function render() {
    program.setUniform('uTime', clock.time);
    renderer.render(scene);
    requestAnimationFrame(render);
}

render();
```

## Author

[Kazi Jawad](https://github.com/kazijawad)
