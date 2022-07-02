export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.buffer = new Float32Array([this.x, this.y]);
        this.usage = WebGL2RenderingContext.STATIC_DRAW;

        this.size = this.buffer.length;
        this.type = WebGL2RenderingContext.FLOAT;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
    }

    static from(x, y) {
        return new Vector2(x, y);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    length() {
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
        return this.divide(this.length() || 1);
    }
}
