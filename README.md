# gl-layer

A minimal WebGL helper library.

## Getting Started

```JavaScript
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
    vertex: `
        attribute vec4 position;

        void main() {
            gl_Position = position;
        }
    `,
    fragment: `
        precision mediump float;

        uniform vec3 uColor;

        void main() {
            gl_FragColor = vec4(uColor, 1.0);
        }
    `,
});

program.setAttribute({
    name: 'position',
    data: [
        -0.25, -0.25,
        0, 0.50,
        0.25, -0.25,
    ],
    size: 2,
});

program.setUniform({
    name: 'uColor',
    data: [1.0, 0.5, 0.5]
});

gl.drawArrays(gl.TRIANGLES, 0, 3);
```

## Author

[Kazi Jawad](https://github.com/kazijawad)
