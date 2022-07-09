export class Vector3 extends Array {
    constructor(x = 0, y = x, z = x) {
        super(x, y, z);
    }

    static from(x, y, z) {
        return new Vector3(x, y, z);
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

    get buffer() {
        return Float32Array.from([this.x, this.y, this.z]);
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

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    multiply(v) {
        if (v.buffer) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        } else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
        return this;
    }

    divide(v) {
        if (v.buffer) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            return this;
        }
        return this.multiply(1 / v);
    }

    normalize() {
        return this.divide(this.magnitude() || 1);
    }

    cross(b) {
        const a = this.clone();
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this;
    }
}
