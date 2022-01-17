export class Program {
    constructor({
        gl,
        attributes,
        uniforms,
        vertex,
        fragment,
    }) {
        this.attributes = new Map();
        this.uniforms = new Map();

        this.gl = gl;
        if (!this.gl && !this.gl.canvas) {
            console.error('Failed to load WebGL context.');
        }

        this.vertex = this.createShader(gl.VERTEX_SHADER, vertex);
        this.fragment = this.createShader(gl.FRAGMENT_SHADER, fragment);

        this.program = this.createProgram();

        this.gl.useProgram(this.program);

        if (attributes) {
            this.setAttributes(attributes);
        }

        if (uniforms) {
            this.setUniforms(uniforms);
        }
    }

    createShader(type, source) {
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

    createProgram() {
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

    setAttributes(attributes) {
        if (!attributes || Array.isArray(attributes) || typeof attributes !== 'object') {
            throw new Error('Program.setAttributes — expected object of attributes.');
        }

        for (const name of Object.keys(attributes)) {
            const properties = attributes[name];

            let data = properties.data || properties;
            if (Array.isArray(data)) {
                data = new Float32Array(data);
            }

            if (!ArrayBuffer.isView(data)) {
                throw new Error(`Program.setAttributes — ${name} does not provide a valid data type.`);
            }

            const buffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

            const location = this.gl.getAttribLocation(this.program, name);
            this.attributes.set(name, {
                location,
                size: properties.size || 2,
                type: properties.type || this.gl.FLOAT,
                normalized: properties.normalized || false,
                stride: properties.stride || 0,
                offset: properties.offset || 0,
            });
        }
    }

    setUniforms(uniforms) {
        if (!uniforms || Array.isArray(uniforms) || typeof uniforms !== 'object') {
            throw new Error('Program.setUniforms — expected object of uniforms.');
        }

        for (const name of Object.keys(uniforms)) {
            const location = this.gl.getUniformLocation(this.program, name);

            let data = uniforms[name];
            if (typeof data === 'number') {
                data = [data];
            }

            let method = 'uniform';
            if (Array.isArray(data)) {
                data = data.map((x) => Number.parseFloat(x).toFixed(2)).map(Number)

                method += data.length;
                method += 'f';

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
                console.error(`Program.setUniforms — invalid data format for ${name}.`);
            }

            this.uniforms.set(name, { data });
        }
    }
}
