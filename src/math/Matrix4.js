export class Matrix4 extends Array {
    constructor(
        m00 = 1, m01 = 0, m02 = 0, m03 = 0,
        m10 = 0, m11 = 1, m12 = 0, m13 = 0,
        m20 = 0, m21 = 0, m22 = 1, m23 = 0,
        m30 = 0, m31 = 0, m32 = 0, m33 = 1,
    ) {
        super(
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33
        );
    }

    static from(
        m00 = 1, m01 = 0, m02 = 0, m03 = 0,
        m10 = 0, m11 = 1, m12 = 0, m13 = 0,
        m20 = 0, m21 = 0, m22 = 1, m23 = 0,
        m30 = 0, m31 = 0, m32 = 0, m33 = 1,
    ) {
        return new Matrix4(
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33
        );
    }

    static translation(v, T = new Matrix4()) {
        T[ 0] =   1; T[ 1] =   0; T[ 2] =   0; T[ 3] = 0;
        T[ 4] =   0; T[ 5] =   1; T[ 6] =   0; T[ 7] = 0;
        T[ 8] =   0; T[ 9] =   0; T[10] =   1; T[11] = 0;
        T[12] = v.x; T[13] = v.y; T[14] = v.z; T[15] = 1;
        return T;
    }

    static rotationX(v, RX = new Matrix4()) {
        RX[ 0] =   1; RX[ 1] =              0; RX[ 2] =             0; RX[ 3] = 0;
        RX[ 4] =   0; RX[ 5] =  Math.cos(v.x); RX[ 6] = Math.sin(v.x); RX[ 7] = 0;
        RX[ 8] =   0; RX[ 9] = -Math.sin(v.x); RX[10] = Math.cos(v.x); RX[11] = 0;
        RX[12] =   0; RX[13] =              0; RX[14] =             0; RX[15] = 1;
        return RX;
    }

    static rotationY(v, RY = new Matrix4()) {
        RY[ 0] = Math.cos(v.y); RY[ 1] = 0; RY[ 2] = -Math.sin(v.y); RY[ 3] = 0;
        RY[ 4] =             0; RY[ 5] = 1; RY[ 6] =              0; RY[ 7] = 0;
        RY[ 8] = Math.sin(v.y); RY[ 9] = 0; RY[10] =  Math.cos(v.y); RY[11] = 0;
        RY[12] =             0; RY[13] = 0; RY[14] =              0; RY[15] = 1;
        return RY;
    }

    static rotationZ(v, RZ = new Matrix4()) {
        RZ[ 0] =  Math.cos(v.y); RZ[ 1] = Math.sin(v.y); RZ[ 2] = 0; RZ[ 3] = 0;
        RZ[ 4] = -Math.sin(v.y); RZ[ 5] = Math.cos(v.y); RZ[ 6] = 0; RZ[ 7] = 0;
        RZ[ 8] =              0; RZ[ 9] =             0; RZ[10] = 1; RZ[11] = 0;
        RZ[12] =              0; RZ[13] =             0; RZ[14] = 0; RZ[15] = 1;
        return RZ;
    }

    static rotation(v, R = new Matrix4()) {
        return Matrix4.multiply(Matrix4.rotationX(v), Matrix4.multiply(Matrix4.rotationY(v), Matrix4.rotationZ(v)));
    }

    static scale(v, S = new Matrix4()) {
        S[ 0] = v.x; S[ 1] =   0; S[ 2] =   0; S[ 3] = 0;
        S[ 4] =   0; S[ 5] = v.y; S[ 6] =   0; S[ 7] = 0;
        S[ 8] =   0; S[ 9] =   0; S[10] = v.z; S[11] = 0;
        S[12] =   0; S[13] =   0; S[14] =   0; S[15] = 1;
        return S;
    }

    static multiply(a, b) {
        const b00 = b[0 * 4 + 0]; const b01 = b[0 * 4 + 1]; const b02 = b[0 * 4 + 2]; const b03 = b[0 * 4 + 3];
        const b10 = b[1 * 4 + 0]; const b11 = b[1 * 4 + 1]; const b12 = b[1 * 4 + 2]; const b13 = b[1 * 4 + 3];
        const b20 = b[2 * 4 + 0]; const b21 = b[2 * 4 + 1]; const b22 = b[2 * 4 + 2]; const b23 = b[2 * 4 + 3];
        const b30 = b[3 * 4 + 0]; const b31 = b[3 * 4 + 1]; const b32 = b[3 * 4 + 2]; const b33 = b[3 * 4 + 3];

        const a00 = a[0 * 4 + 0]; const a01 = a[0 * 4 + 1]; const a02 = a[0 * 4 + 2]; const a03 = a[0 * 4 + 3];
        const a10 = a[1 * 4 + 0]; const a11 = a[1 * 4 + 1]; const a12 = a[1 * 4 + 2]; const a13 = a[1 * 4 + 3];
        const a20 = a[2 * 4 + 0]; const a21 = a[2 * 4 + 1]; const a22 = a[2 * 4 + 2]; const a23 = a[2 * 4 + 3];
        const a30 = a[3 * 4 + 0]; const a31 = a[3 * 4 + 1]; const a32 = a[3 * 4 + 2]; const a33 = a[3 * 4 + 3];

        const c = new Matrix4();
        
        c[ 0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        c[ 1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        c[ 2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        c[ 3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        
        c[ 4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        c[ 5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        c[ 6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        c[ 7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        
        c[ 8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        c[ 9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        c[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        c[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        
        c[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        c[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        c[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        c[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return c;
    }

    copy(m) {
        this[ 0] = m[ 0]; this[ 1] = m[ 1]; this[ 2] = m[ 2]; this[ 3] = m[ 3];
        this[ 4] = m[ 4]; this[ 5] = m[ 5]; this[ 6] = m[ 6]; this[ 7] = m[ 7];
        this[ 8] = m[ 8]; this[ 9] = m[ 9]; this[10] = m[10]; this[11] = m[11];
        this[12] = m[12]; this[13] = m[13]; this[14] = m[14]; this[15] = m[15];
    }

    compose(position, rotation, scale) {
        const T = Matrix4.translation(position);
        const R = Matrix4.rotation(rotation);
        const S = Matrix4.scale(scale);
        const TRS = Matrix4.multiply(T, Matrix4.multiply(R, S));
        this.copy(TRS);
    }
}
