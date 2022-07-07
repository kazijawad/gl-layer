export class Attribute {
    constructor(arr, size) {
        this.buffer = new Float32Array(arr);
        this.size = size;
    }

    static from(arr, size) {
        return new Attribute(arr, size);
    }

    get usage() {
        return WebGL2RenderingContext.STATIC_DRAW;
    }

    get type() {
        return WebGL2RenderingContext.FLOAT;
    }

    get normalized() {
        return false;
    }

    get stride() {
        return 0;
    }

    get offset() {
        return 0;
    }

    get drawCount() {
        return this.buffer.length / this.size;
    }
}
