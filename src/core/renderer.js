export class Renderer {
    constructor({
        canvas = document.createElement('canvas'),
        dpr = Math.min(window.devicePixelRatio, 2),
        webgl = 1,
        width = 300,
        height = 150,
    }) {
        this.element = canvas;
        this.dpr = dpr;
        this.webgl = webgl;

        if (!document.body.contains(canvas)) {
            document.body.appendChild(canvas);
        }

        this.gl = canvas.getContext(this.context);
        if (!this.gl) {
            console.error('Failed to create WebGL context.');
        }

        this.setSize(width, height);
        this.setViewport(this.gl.canvas.width, this.gl.canvas.height);
    }

    get context() {
        if (this.webgl === 1) {
            return 'webgl';
        } else if (this.webgl === 2) {
            return 'webgl2';
        }
    }

    setSize(width, height) {
        const displayWidth = Math.round(width * this.dpr);
        const displayHeight = Math.round(height * this.dpr);

        const needResize = width !== displayWidth || height !== displayHeight || this.gl.canvas.width !== displayWidth || this.gl.canvas.height || displayHeight;
        if (needResize) {
            this.gl.canvas.width = displayWidth;
            this.gl.canvas.height = displayHeight;
        }

        return needResize;
    }

    setViewport(width, height) {
        this.gl.viewport(0, 0, width, height);
    }

    resize(width, height) {
        this.setSize(width, height);
        this.setViewport(this.gl.canvas.width, this.gl.canvas.height);
    }

    render({ program, mode, start, count }) {
        for (const attribute of program.attributes) {
            const { location, size, type, normalized, stride, offset } = attribute[1];
            this.gl.enableVertexAttribArray(location);
            this.gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        }

        this.gl.drawArrays(mode || this.gl.TRIANGLES, start || 0, count);
    }
}
