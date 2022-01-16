export class Texture {
    constructor({
        gl,
        src,
        wrapS,
        wrapT,
        minFilter,
        magFilter,
    }) {
        // Initialization
        this.gl = gl;
        this.src = src;
        this.wrapS = wrapS || this.gl.CLAMP_TO_EDGE;
        this.wrapT = wrapT || this.gl.CLAMP_TO_EDGE;
        this.minFilter = minFilter || this.gl.NEAREST;
        this.magFilter = magFilter || this.gl.NEAREST;

        // Creation 
        this.glTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);

        // Parameters
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.magFilter);

        // Image
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.src);
    }
}
