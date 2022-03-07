export class Program {
    constructor(gl, vertexSource, fragmentSource) {
        let success;
        let errLog;

        this.gl = gl;
        this.attributes = new Map();
        this.uniforms = new Map();

        this.vertex = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vertex, vertexSource);
        this.gl.compileShader(this.vertex);

        success = this.gl.getShaderParameter(this.vertex, this.gl.COMPILE_STATUS);
        if (!success) {
            errLog = new Error(this.gl.getShaderInfoLog(this.vertex));
            this.gl.deleteShader(this.vertex);
            this.vertex = null;
            throw errLog;
        }

        this.fragment = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.fragment, fragmentSource);
        this.gl.compileShader(this.fragment);

        success = this.gl.getShaderParameter(this.fragment, this.gl.COMPILE_STATUS);
        if (!success) {
            errLog = new Error(this.gl.getShaderInfoLog(this.fragment));
            this.gl.deleteShader(this.fragment);
            this.fragment = null;
            throw errLog;
        }

        this.source = this.gl.createProgram();
        this.gl.attachShader(this.source, this.vertex);
        this.gl.attachShader(this.source, this.fragment);
        this.gl.linkProgram(this.source);

        success = this.gl.getProgramParameter(this.source, this.gl.LINK_STATUS);
        if (!success) {
            errLog = new Error(this.gl.getProgramInfoLog(this.source));
            this.gl.deleteProgram(this.source);
            this.source = null;
            throw errLog;
        }

        this.gl.useProgram(this.source);
    }

    setAttribute(name, value, size = 2, type = this.gl.FLOAT, normalized = false, stride = 0, offset = 0) {
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, value, this.gl.STATIC_DRAW);

        this.attributes.set(name, {
            location: this.gl.getAttribLocation(this.source, name),
            buffer,
            value,
            size,
            type,
            normalized,
            stride,
            offset
        });
    }

    setUniform(name, value) {
        if (typeof value === 'number') {
            value = [value];
        }

        const location = this.gl.getUniformLocation(this.source, name);

        let method = 'uniform';
        method += value.length;
        if (value instanceof Float32Array) {
            method += 'fv';
            this.gl[method](location, value);
        } else if (value instanceof Int32Array) {
            method += 'iv';
            this.gl[method](location, value);
        } else if (Array.isArray(value)) {
            if (value.every((v) => v % 1 === 0)) {
                method += 'i';
            } else {
                method += 'f';
            }
            this.gl[method](location, ...value);
        } else {
            throw new Error('Program::setUniform — Invalid Format', name, value);
        }

        this.uniforms.set(name, { value });
    }
}
