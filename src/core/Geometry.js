import { Attribute } from '../math/Attribute.js';

export class Geometry {
    constructor(position, normal, uv) {
        this.drawRange = {};
        this.attributes = [];

        if (position instanceof Attribute) {
            this.setDrawRange(0, position.drawCount);
            this.setAttribute(0, position);
        }

        if (normal instanceof Attribute) {
            this.setAttribute(1, normal);
        }

        if (uv instanceof Attribute) {
            this.setAttribute(2, uv);
        }
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
