import { Vector2, Vector3, Vector4 } from '../index.js';

export class Program {
    constructor(vertexSource, fragmentSource) {
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;

        this.uniforms = [];
    }

    use(gl) {
        if (!this.source) {
            let success;
            let errLog;

            this.vertex = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this.vertex, this.vertexSource);
            gl.compileShader(this.vertex);

            success = gl.getShaderParameter(this.vertex, gl.COMPILE_STATUS);
            if (!success) {
                errLog = new Error(gl.getShaderInfoLog(this.vertex));
                gl.deleteShader(this.vertex);
                this.vertex = null;
                throw errLog;
            }

            this.fragment = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(this.fragment, this.fragmentSource);
            gl.compileShader(this.fragment);

            success = gl.getShaderParameter(this.fragment, gl.COMPILE_STATUS);
            if (!success) {
                errLog = new Error(gl.getShaderInfoLog(this.fragment));
                gl.deleteShader(this.fragment);
                this.fragment = null;
                throw errLog;
            }

            this.source = gl.createProgram();
            gl.attachShader(this.source, this.vertex);
            gl.attachShader(this.source, this.fragment);
            gl.linkProgram(this.source);

            success = gl.getProgramParameter(this.source, gl.LINK_STATUS);
            if (!success) {
                errLog = new Error(gl.getProgramInfoLog(this.source));
                gl.deleteProgram(this.source);
                this.source = null;
                throw errLog;
            }
        }

        gl.useProgram(this.source);

        for (const uniform of this.uniforms) {
            const [name, value] = uniform;

            const location = gl.getUniformLocation(this.source, name);

            if (value instanceof Vector2) {
                gl.uniform2fv(location, value.buffer);
            } else if (value instanceof Vector3) {
                gl.uniform3fv(location, value.buffer);
            } else if (value instanceof Vector4) {
                gl.uniform4fv(location, value.buffer);
            } else if (typeof value === 'number' && !Number.isInteger(value)) {
                gl.uniform1f(location, value);
            } else {
                throw new Error('PROGRAM::UNIFORM::INVALID_INPUT');
            }
        }
    }

    setUniform(name, value) {
        this.uniforms.push([name, value]);
    }
}