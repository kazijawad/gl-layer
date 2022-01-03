export class Renderer {
    static getContext(versionNumber) {
        if (versionNumber === 1) {
            return 'webgl';
        } else if (versionNumber === 2) {
            return 'webgl2';
        }
    }

    constructor({
        canvas = document.createElement('canvas'),
        dpr = Math.min(window.devicePixelRatio, 2),
        width = 300,
        height = 150,
        webgl = 1,
    }) {
        this.dpr = dpr;
        this._callbacks = new Map();

        this.gl = canvas.getContext(Renderer.getContext(webgl));
        if (!this.gl) {
            console.error('Failed to create WebGL context.');
        }

        this._createState();

        this.setSize(width, height);
        this.setViewport(this.gl.canvas.width, this.gl.canvas.height);
    }

    _createState() {
        this.state = new Proxy({}, {
            set: async (target, key, value) => {
                target[key] = value;

                if (this._callbacks.has(key)) {
                    const callback = this._callbacks.get(key);
                    await callback(key, value);
                }

                return true;
            }
        });

        this.state.bind = (key, callback) => this._callbacks.set(key, callback);
    }

    setSize(width, height) {
        const displayWidth = Math.round(width * this.dpr);
        const displayHeight = Math.round(height * this.dpr);

        const needResize = width !== displayWidth || height !== displayHeight;
        if (needResize) {
            this.state.width = this.gl.canvas.width = displayWidth;
            this.state.height = this.gl.canvas.height = displayHeight;
        }

        return needResize;
    }

    setViewport(width, height) {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}
