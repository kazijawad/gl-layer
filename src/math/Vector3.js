export class Vector3 {
    constructor(x, y, z) {
        this.x = this.r = x;
        this.y = this.g = y;
        this.z = this.b = z;

        this.buffer = new Float32Array([this.x, this.y, this.z]);
        this.usage = WebGL2RenderingContext.STATIC_DRAW;

        this.size = this.buffer.length;
        this.type = WebGL2RenderingContext.FLOAT;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
    }
}