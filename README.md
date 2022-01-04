# gl-layer

A minimal WebGL helper library.

## Getting Started

```JavaScript
import { Renderer, Program } from 'gl-layer';

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
        position: [-0.25, -0.25, 0, 0.50, 0.25, -0.25,],
    },
    uniforms: {
        uColor: [0.5, 0.5, 0.5, 1.0],
        uTime: performance.now(),
    },
    vertex: `
        attribute vec4 position;
        attribute vec2 texCoord;

        varying vec4 vColor;
        varying vec2 vTexCoord;

        void main() {
            gl_Position = position;
            vColor = gl_Position * 0.5 + 0.5;
            vTexCoord = texCoord;
        }
    `,
    fragment: `
        precision mediump float;

        uniform vec4 uColor;
        uniform float uTime;
        uniform sampler2D uImage;

        varying vec4 vColor;
        varying vec2 vTexCoord;

        void main() {
            gl_FragColor = mix(vColor, uColor, sin(uTime * 0.001));
        }
    `,
});

function loop() {
    program.setUniforms({ uTime: performance.now() });
    renderer.render(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(loop);
}

loop();
```

## Author

[Kazi Jawad](https://github.com/kazijawad)
