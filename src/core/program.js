export class Program {
    constructor({
        gl,
        vertex,
        fragment
    }) {
        this.gl = gl;
        if (!this.gl && !this.gl.canvas) {
            console.error('Failed to load WebGL context.');
        }

        this.vertex = this._createShader(gl.VERTEX_SHADER, vertex);
        this.fragment = this._createShader(gl.FRAGMENT_SHADER, fragment);

        this.program = this._createProgram();

        this.gl.useProgram(this.program);
    }

    _createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.error(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    _createProgram() {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, this.vertex);
        this.gl.attachShader(program, this.fragment);
        this.gl.linkProgram(program);

        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }

        console.error(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    setAttribute({
        name,
        data,
        size,
        usage = this.gl.STATIC_DRAW,
    }) {
        const location = this.gl.getAttribLocation(this.program, name);
        this.gl.enableVertexAttribArray(location);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

        if (Array.isArray(data)) {
            data = new Float32Array(data);
        }

        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
    }

    setUniform({
        name,
        data
    }) {
        const location = this.gl.getUniformLocation(this.program, name);

        let method = 'uniform';
        if (Array.isArray(data)) {
            method += data.length;

            const ints = data.filter(Number.isInteger);
            if (ints.length !== data.length) {
                method += 'f';
            } else {
                data = data.map(Number);
                method += 'i';
            }

            this.gl[method](location, ...data);
        } else if (data instanceof Float32Array) {
            method += data.length;
            method += 'fv';
            this.gl[method](location, data);
        } else if (data instanceof Int32Array) {
            method += data.length;
            method += 'iv';
            this.gl[method](location, data);
        } else {
            console.error('Invalid data format.');
        }
    }
}
