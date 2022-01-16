# gl-layer

A minimal WebGL helper library.

## Getting Started

```JavaScript
import { Renderer, Program, Clock } from 'gl-layer';

const clock = new Clock();

const renderer = new Renderer({
    canvas: document.querySelector('.stage'),
    width: window.innerWidth,
    height: window.innerHeight,
});

const gl = renderer.gl;

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

const program = new Program({
    gl,
    attributes: {
        position: [-0.25, -0.25, 0, 0.50, 0.25, -0.25],
    },
    uniforms: {
        uColor: [1.0, 1.0, 1.0],
        uTime: clock.time,
    },
    vertex: `
        attribute vec4 position;

        void main() {
            gl_Position = position;
        }
    `,
    fragment: `
        precision mediump float;

        uniform vec3 uColor;
        uniform float uTime;

        void main() {
            gl_FragColor = vec4(vec3(sin(uTime), 0.5, cos(uTime)) * uColor, 1.0);
        }
    `,
});

function render() {
    program.setUniforms({ uTime: clock.time })
    renderer.render({ program, count: 3 });
    requestAnimationFrame(render);
}

render();
```

## Author

[Kazi Jawad](https://github.com/kazijawad)
