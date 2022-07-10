import { Transform } from './Transform.js';
import { Mesh } from './Mesh.js';
import { Geometry } from './Geometry.js';
import { Program } from './Program.js';
import { Attribute } from '../math/Attribute.js';

export class Renderer {
    constructor(canvas = document.createElement('canvas')) {
        this.element = canvas;

        this.webgl = 2;
        this.dpr = Math.min(window.devicePixelRatio, 2);

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.clearColor = true;
        this.clearDepth = true;

        if (!document.body.contains(canvas)) {
            document.body.appendChild(canvas);
        }

        this.gl = canvas.getContext(this.context);
        if (!this.gl) {
            throw new Error('RENDERER::CONTEXT::FAILED');
        }

        this.setSize(this.width, this.height);
        this.depthTest = true;
    }

    get context() {
        return 'webgl2';
    }

    set depthTest(value) {
        if (value) {
            this.gl.enable(this.gl.DEPTH_TEST);
        } else {
            this.gl.disable(this.gl.DEPTH_TEST);
        }
    }

    setSize(width, height) {
        const displayWidth = Math.round(width * this.dpr);
        const displayHeight = Math.round(height * this.dpr);

        const needResize = width !== displayWidth || height !== displayHeight || this.gl.canvas.width !== displayWidth || this.gl.canvas.height || displayHeight;
        if (needResize) {
            this.width = this.gl.canvas.width = displayWidth;
            this.height = this.gl.canvas.height = displayHeight;
        }

        this.setViewport(0, 0, this.width, this.height);

        return needResize;
    }

    setViewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    render(scene, camera) {
        if (this.clearColor) {
            this.gl.clearColor(0, 0, 0, 0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }

        if (this.clearDepth) {
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

        if (scene instanceof Transform && !camera) {
            throw new Error('RENDERER::RENDER::NO_CAMERA');
        }

        if (scene instanceof Program) {
            const geometry = new Geometry(Attribute.from([-1, -1, -1, 3, 3, -1], 2));
            const mesh = new Mesh(geometry, scene);
            mesh.draw(this.gl);
        } else if (camera) {
            camera.updateWorldMatrix();

            for (const object of scene.children) {
                object.draw(this.gl, camera);
            }
        }
    }
}
