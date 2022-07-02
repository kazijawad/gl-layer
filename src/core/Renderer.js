export class Renderer {
    constructor(canvas = document.createElement('canvas')) {
        this.element = canvas;

        this.webgl = 2;
        this.dpr = Math.min(window.devicePixelRatio, 2);

        this.width = 300;
        this.height = 300;

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

    render(scene) {
        if (this.clearColor) {
            this.gl.clearColor(0, 0, 0, 0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }

        if (this.clearDepth) {
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

        for (const object of scene.children) {
            object.draw(this.gl);
        }
    }
}
