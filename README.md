# gl-layer

A minimal WebGL helper library.

## Getting Started

```JavaScript
import { Renderer, Program, Clock } from 'gl-layer';

const clock = new Clock();

const renderer = new Renderer();
const gl = renderer.gl;

const vertexSource = `
    attribute vec4 position;

    void main() {
        gl_Position = position;
    }
`;

const fragmentSource = `
    precision mediump float;

    uniform vec3 uColor;
    uniform float uTime;

    void main() {
        gl_FragColor = vec4(vec3(sin(uTime), 0.5, cos(uTime)) * uColor, 1.0);
    }
`;

const program = new Program(gl, vertexSource, fragmentSource);
program.setAttribute('position', new Float32Array([-0.50, -0.50, 0, 0.50, 0.50, -0.50]));
program.setUniform('uColor', new Float32Array([1.0, 1.0, 1.0]));
program.setUniform('uTime', clock.time);

function render() {
    program.setUniform('uTime', clock.time);
    renderer.render();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(render);
}

render();
```

## Author

[Kazi Jawad](https://github.com/kazijawad)
