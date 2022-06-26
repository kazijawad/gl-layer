import { Vector2Array } from '../math/Vector2Array.js';

export class Geometry {
    constructor(vertices) {
        this.drawRange = {};
        this.attributes = [];

        this.setDrawRange(0, vertices.drawCount);
        this.setAttribute(0, vertices);
    }

    setDrawRange(first, count) {
        this.drawRange.first = first;
        this.drawRange.count = count;
    }

    setAttribute(location, object) {
        this.attributes.push([location, object]);
    }

    draw(gl) {
        if (!this.vao) {
            this.vao = gl.createVertexArray();
            gl.bindVertexArray(this.vao);

            for (const attribute of this.attributes) {
                const [location, object] = attribute;

                const VBO = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
                gl.bufferData(gl.ARRAY_BUFFER, object.buffer, object.usage);

                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, object.size, object.type, object.normalized, object.stride, object.offset);
            }
        }

        gl.bindVertexArray(this.vao);
        gl.drawArrays(gl.TRIANGLES, this.drawRange.first, this.drawRange.count);
    }
}
