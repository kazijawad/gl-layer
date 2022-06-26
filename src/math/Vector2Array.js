export class Vector2Array {
    constructor(arr) {
        this.buffer = new Float32Array(arr);
        this.usage = WebGL2RenderingContext.STATIC_DRAW;

        this.size = 2;
        this.type = WebGL2RenderingContext.FLOAT;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;

        this.drawCount = this.buffer.length / this.size;
    }
}
