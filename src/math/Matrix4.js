import { Vector3 } from './Vector3.js';
import { Matrix3 } from './Matrix3.js';
import { MathUtils } from '../utils/MathUtils.js';

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

    static orthographic(left, right, bottom, top, near, far) {
        return Matrix4.from(
                         2 / (right - left),                               0,                           0, 0,
                                          0,              2 / (top - bottom),                           0, 0,
                                          0,                               0,            2 / (near - far), 0,
            (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1,
        );
    }

    static perspective(fov, aspect, near, far) {
        const top = near * Math.tan(MathUtils.Radian(fov) / 2);
        const bottom = -top;
        const right = top * aspect;
        const left = -right;

        return Matrix4.from(
                          2 * near / (right - left),                                       0,                             0,  0,
                                                  0,               2 * near / (top - bottom),                             0,  0,
                                                  0,                                       0,  -(far + near) / (far - near), -1,
            -near * (right + left) / (right - left), -near * (top + bottom) / (top - bottom), 2 * far * near / (near - far),  0,
        );
    }

    static lookAt(position, target, up) {
        const Z = position.clone().subtract(target).normalize();
        const X = up.clone().cross(Z).normalize();
        const Y = Z.clone().cross(X).normalize();

        return Matrix4.from(
                   X.x,        X.y,        X.z, 0,
                   Y.x,        Y.y,        Y.z, 0,
                   Z.x,        Z.y,        Z.z, 0,
            position.x, position.y, position.z, 1,
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

    static normal(a) {
        let a00 = a[ 0]; let a01 = a[ 1]; let a02 = a[ 2]; let a03 = a[ 3];
        let a10 = a[ 4]; let a11 = a[ 5]; let a12 = a[ 6]; let a13 = a[ 7];
        let a20 = a[ 8]; let a21 = a[ 9]; let a22 = a[10]; let a23 = a[11];
        let a30 = a[12]; let a31 = a[13]; let a32 = a[14]; let a33 = a[15];

        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32;

        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;

        const N = new Matrix3();

        N[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        N[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        N[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

        N[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        N[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        N[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

        N[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        N[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        N[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

        return N;
    }

    static multiply(a, b) {
        const b00 = b[ 0]; const b01 = b[ 1]; const b02 = b[ 2]; const b03 = b[ 3];
        const b10 = b[ 4]; const b11 = b[ 5]; const b12 = b[ 6]; const b13 = b[ 7];
        const b20 = b[ 8]; const b21 = b[ 9]; const b22 = b[10]; const b23 = b[11];
        const b30 = b[12]; const b31 = b[13]; const b32 = b[14]; const b33 = b[15];

        const a00 = a[ 0]; const a01 = a[ 1]; const a02 = a[ 2]; const a03 = a[ 3];
        const a10 = a[ 4]; const a11 = a[ 5]; const a12 = a[ 6]; const a13 = a[ 7];
        const a20 = a[ 8]; const a21 = a[ 9]; const a22 = a[10]; const a23 = a[11];
        const a30 = a[12]; const a31 = a[13]; const a32 = a[14]; const a33 = a[15];

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

    get buffer() {
        return Float32Array.from([
            this[ 0], this[ 1], this[ 2], this[ 3],
            this[ 4], this[ 5], this[ 6], this[ 7],
            this[ 8], this[ 9], this[10], this[11],
            this[12], this[13], this[14], this[15],
        ]);
    }

    clone() {
        return new Matrix4(
            this[ 0], this[ 1], this[ 2], this[ 3],
            this[ 4], this[ 5], this[ 6], this[ 7],
            this[ 8], this[ 9], this[10], this[11],
            this[12], this[13], this[14], this[15],
        );
    }

    copy(m) {
        this[ 0] = m[ 0]; this[ 1] = m[ 1]; this[ 2] = m[ 2]; this[ 3] = m[ 3];
        this[ 4] = m[ 4]; this[ 5] = m[ 5]; this[ 6] = m[ 6]; this[ 7] = m[ 7];
        this[ 8] = m[ 8]; this[ 9] = m[ 9]; this[10] = m[10]; this[11] = m[11];
        this[12] = m[12]; this[13] = m[13]; this[14] = m[14]; this[15] = m[15];
        return this;
    }

    compose(position, rotation, scale) {
        const T = Matrix4.translation(position);
        const R = Matrix4.rotation(rotation);
        const S = Matrix4.scale(scale);
        const TRS = Matrix4.multiply(T, Matrix4.multiply(R, S));
        this.copy(TRS);
        return this;
    }

    inverse(m) {
        const m00 = m[ 0]; const m01 = m[ 1]; const m02 = m[ 2]; const m03 = m[ 3];
        const m10 = m[ 4]; const m11 = m[ 5]; const m12 = m[ 6]; const m13 = m[ 7];
        const m20 = m[ 8]; const m21 = m[ 9]; const m22 = m[10]; const m23 = m[11];
        const m30 = m[12]; const m31 = m[13]; const m32 = m[14]; const m33 = m[15];

        const t00 = m22 * m33; const t01 = m32 * m23; const t02 = m12 * m33; const t03 = m32 * m13;
        const t04 = m12 * m23; const t05 = m22 * m13; const t06 = m02 * m33; const t07 = m32 * m03;
        const t08 = m02 * m23; const t09 = m22 * m03; const t10 = m02 * m13; const t11 = m12 * m03;
        const t12 = m20 * m31; const t13 = m30 * m21; const t14 = m10 * m31; const t15 = m30 * m11;
        const t16 = m10 * m21; const t17 = m20 * m11; const t18 = m00 * m31; const t19 = m30 * m01;
        const t20 = m00 * m21; const t21 = m20 * m01; const t22 = m00 * m11; const t23 = m10 * m01;

        const t0 = (t00 * m11 + t03 * m21 + t04 * m31) - (t01 * m11 + t02 * m21 + t05 * m31);
        const t1 = (t01 * m01 + t06 * m21 + t09 * m31) - (t00 * m01 + t07 * m21 + t08 * m31);
        const t2 = (t02 * m01 + t07 * m11 + t10 * m31) - (t03 * m01 + t06 * m11 + t11 * m31);
        const t3 = (t05 * m01 + t08 * m11 + t11 * m21) - (t04 * m01 + t09 * m11 + t10 * m21);

        const det = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        this[ 0] = det * t0;
        this[ 1] = det * t1;
        this[ 2] = det * t2;
        this[ 3] = det * t3;

        this[ 4] = det * ((t01 * m10 + t02 * m20 + t05 * m30) - (t00 * m10 + t03 * m20 + t04 * m30));
        this[ 5] = det * ((t00 * m00 + t07 * m20 + t08 * m30) - (t01 * m00 + t06 * m20 + t09 * m30));
        this[ 6] = det * ((t03 * m00 + t06 * m10 + t11 * m30) - (t02 * m00 + t07 * m10 + t10 * m30));
        this[ 7] = det * ((t04 * m00 + t09 * m10 + t10 * m20) - (t05 * m00 + t08 * m10 + t11 * m20));

        this[ 8] = det * ((t12 * m13 + t15 * m23 + t16 * m33) - (t13 * m13 + t14 * m23 + t17 * m33));
        this[ 9] = det * ((t13 * m03 + t18 * m23 + t21 * m33) - (t12 * m03 + t19 * m23 + t20 * m33));
        this[10] = det * ((t14 * m03 + t19 * m13 + t22 * m33) - (t15 * m03 + t18 * m13 + t23 * m33));
        this[11] = det * ((t17 * m03 + t20 * m13 + t23 * m23) - (t16 * m03 + t21 * m13 + t22 * m23));

        this[12] = det * ((t14 * m22 + t17 * m32 + t13 * m12) - (t16 * m32 + t12 * m12 + t15 * m22));
        this[13] = det * ((t20 * m32 + t12 * m02 + t19 * m22) - (t18 * m22 + t21 * m32 + t13 * m02));
        this[14] = det * ((t18 * m12 + t23 * m32 + t15 * m02) - (t22 * m32 + t14 * m02 + t19 * m12));
        this[15] = det * ((t22 * m22 + t16 * m02 + t21 * m12) - (t20 * m12 + t23 * m22 + t17 * m02));

        return this;
    }

    translation() {
        return Vector3.from(this[3], this[7], this[11]);
    }

    rotation() {
        const s = this.scale();
        const R = Matrix4.from(
            this[ 0] / s.x, this[ 1] / s.y, this[ 2] / s.z, 0,
            this[ 4] / s.x, this[ 5] / s.y, this[ 6] / s.z, 0,
            this[ 8] / s.x, this[ 9] / s.y, this[10] / s.z, 0,
                         0,              0,              0, 1,
        );
        return Vector3.from(
            Math.atan2( R[6],                                             R[10]),
            Math.atan2(-R[2], Math.sqrt(Math.pow(R[6], 2) + Math.pow(R[10], 2))),
            Math.atan2( R[1],                                              R[0]),
        );
    }

    scale() {
        return Vector3.from(
            Vector3.from(this[0], this[4], this[ 8]).magnitude(),
            Vector3.from(this[1], this[5], this[ 9]).magnitude(),
            Vector3.from(this[2], this[6], this[10]).magnitude(),
        );
    }

    debug() {
        const A = this.clone();
        console.log('');
        console.log(A[ 0], A[ 1], A[ 2], A[ 3]);
        console.log(A[ 4], A[ 5], A[ 6], A[ 7]);
        console.log(A[ 8], A[ 9], A[10], A[11]);
        console.log(A[12], A[13], A[14], A[15]);
        console.log('');
    }
}
