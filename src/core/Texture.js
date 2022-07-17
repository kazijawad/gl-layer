export class Texture {
    constructor(
        value,
        wrapS = WebGL2RenderingContext.REPEAT,
        wrapT = WebGL2RenderingContext.REPEAT,
        minFilter = WebGL2RenderingContext.NEAREST,
        magFilter = WebGL2RenderingContext.NEAREST
    ) {
        this.value = value;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.flipY = true;
    }

    static from(value, wrapS, wrapT, minFilter, magFilter) {
        return new Texture(value, wrapS, wrapT, minFilter, magFilter);
    }

    use(gl) {
        if (!this.source) {
            this.source = gl.createTexture();
        }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        gl.bindTexture(gl.TEXTURE_2D, this.source);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.value);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    }
}
