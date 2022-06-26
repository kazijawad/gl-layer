export class Texture2D {
    constructor(gl, value, wrapS = gl.CLAMP_TO_EDGE, wrapT = gl.CLAMP_TO_EDGE, minFilter = gl.NEAREST, magFilter = gl.NEAREST) {
        this.gl = gl;
        this.value = value;

        this.source = this.gl.createTexture();

        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.minFilter = minFilter;
        this.magFilter = magFilter;

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.source);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.value);
    }

    set wrapS(value) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.source);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, value);
    }

    set wrapT(value) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.source);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, value);
    }

    set minFilter(value) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.source);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, value);
    }

    set magFilter(value) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.source);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, value);
    }
}
