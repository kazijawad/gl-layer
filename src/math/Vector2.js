export class Vector2 {
    constructor(x, y) {
        this.x = this.r = x;
        this.y = this.g = y;

        this.buffer = new Float32Array([this.x, this.y]);
        this.usage = WebGL2RenderingContext.STATIC_DRAW;

        this.size = this.buffer.length;
        this.type = WebGL2RenderingContext.FLOAT;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
    }
}
