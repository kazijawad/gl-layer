export class Vector3Array {
    constructor(arr) {
        this.buffer = new Float32Array(arr);
        this.usage = WebGL2RenderingContext.STATIC_DRAW;

        this.size = 3;
        this.type = WebGL2RenderingContext.FLOAT;
        this.normalized = false;
        this.stride = 0;
        this.offset = 0;
    }
}
