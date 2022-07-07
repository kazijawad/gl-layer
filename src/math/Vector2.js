export class Vector2 extends Array {
    constructor(x = 0, y = x) {
        super(x, y);

        this.buffer = new Float32Array([x, y]);
    }

    static from(x, y) {
        return new Vector2(x, y);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    multiply(v) {
        if (v.buffer) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }

    divide(v) {
        if (v.buffer) {
            this.x /= v.x;
            this.y /= v.y;
            return this;
        }
        return this.multiply(1 / v);
    }

    normalize() {
        return this.divide(this.magnitude() || 1);
    }
}
