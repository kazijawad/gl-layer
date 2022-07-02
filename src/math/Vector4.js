export class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        this.buffer = new Float32Array([this.x, this.y, this.z, this.w]);
        this.usage = WebGL2RenderingContext.STATIC_DRAW;

        this.size = this.buffer.length;
        this.type = WebGL2RenderingContext.FLOAT;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
    }

    static from(x, y, z, w) {
        return new Vector4(x, y, z, w);
    }

    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    multiply(v) {
        if (v.buffer) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            this.w *= v.w;
        } else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
            this.w *= v;
        }
        return this;
    }

    divide(v) {
        if (v.buffer) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            this.w /= v.w;
            return this;
        }
        return this.multiply(1 / v);
    }

    normalize() {
        return this.divide(this.length() || 1);
    }
}
