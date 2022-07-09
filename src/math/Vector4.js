export class Vector4 extends Array {
    constructor(x = 0, y = x, z = x, w = x) {
        super(x, y, z, w);
    }

    static from(x, y, z, w) {
        return new Vector4(x, y, z, w);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    get buffer() {
        return Float32Array.from([this.x, this.y, this.z, this.w]);
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set z(v) {
        this[2] = v;
    }

    set w(v) {
        this[3] = v;
    }

    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
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
        return this.divide(this.magnitude() || 1);
    }
}
