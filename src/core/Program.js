import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';
import { Vector4 } from '../math/Vector4.js';
import { Matrix3 } from '../math/Matrix3.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Texture } from './Texture.js';

export class Program {
    constructor(vertexSource, fragmentSource) {
        if (!fragmentSource) {
            fragmentSource = vertexSource;
            vertexSource = `#version 300 es
                layout (location = 0) in vec4 position;

                void main() {
                    gl_Position = position;
                }
            `;
        }

        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;

        this.uniforms = {};
        this.textureUnit = 0;
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

        const filteredUniforms = Object.keys(this.uniforms).filter((k) => this.uniforms[k].needsUpdate);
        for (const name of filteredUniforms) {
            const uniform = this.uniforms[name];

            const value = uniform.value;
            const location = gl.getUniformLocation(this.source, name);

            if (value instanceof Vector2) {
                gl.uniform2fv(location, value.buffer);
            } else if (value instanceof Vector3) {
                gl.uniform3fv(location, value.buffer);
            } else if (value instanceof Vector4) {
                gl.uniform4fv(location, value.buffer);
            } else if (value instanceof Matrix3) {
                gl.uniformMatrix3fv(location, false, value.buffer);
            } else if (value instanceof Matrix4) {
                gl.uniformMatrix4fv(location, false, value.buffer);
            } else if (value instanceof Texture) {
                value.use(gl);
                gl.uniform1i(location, this.textureUnit);
                this.textureUnit++;
            } else if (typeof value === 'number' && !Number.isInteger(value)) {
                gl.uniform1f(location, value);
            } else if (typeof value === 'number' && Number.isInteger(value)) {
                gl.uniform1i(location, value);
            } else {
                throw new Error(`PROGRAM::UNIFORM::INVALID_INPUT::${value}`);
            }

            uniform.needsUpdate = false;
        }
    }

    setUniform(name, value) {
        this.uniforms[name] = { value, needsUpdate: true };
    }
}
