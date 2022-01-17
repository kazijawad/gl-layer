export class Renderer {
    constructor({
        canvas = document.createElement('canvas'),
        dpr = Math.min(window.devicePixelRatio, 2),
        webgl = 1,
        width = 300,
        height = 150,
        clearColor = true,
        clearDepth = true,
        autoClear = true,
    }) {
        this.element = canvas;
        this.dpr = dpr;
        this.webgl = webgl;
        this.width = width;
        this.height = height;
        this.clearColor = clearColor;
        this.clearDepth = clearDepth;
        this.autoClear = autoClear;

        if (!document.body.contains(canvas)) {
            document.body.appendChild(canvas);
        }

        this.gl = canvas.getContext(this.context);
        if (!this.gl) {
            console.error('Failed to create WebGL context.');
        }

        this.setSize(this.width, this.height);
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
            this.width = this.gl.canvas.width = displayWidth;
            this.height = this.gl.canvas.height = displayHeight;
        }

        this.setViewport(0, 0, this.width, this.height);

        return needResize;
    }

    setViewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    render({ program, mode, start, count, clear }) {
        if (clear || (this.autoClear && !clear)) {
            if (this.clearColor) {
                this.gl.clearColor(0, 0, 0, 0);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            }

            if (this.clearDepth) {
                this.gl.enable(this.gl.DEPTH_TEST);
                this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
            }
        }

        for (const attribute of program.attributes) {
            const { location, size, type, normalized, stride, offset } = attribute[1];
            this.gl.enableVertexAttribArray(location);
            this.gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        }

        this.gl.drawArrays(mode || this.gl.TRIANGLES, start || 0, count);
    }
}
