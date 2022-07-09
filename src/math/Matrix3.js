import { Vector3 } from './Vector3.js';
import { MathUtils } from '../utils/MathUtils.js';

export class Matrix3 extends Array {
    constructor(
        m00 = 1, m01 = 0, m02 = 0,
        m10 = 0, m11 = 1, m12 = 0,
        m20 = 0, m21 = 0, m22 = 1,
    ) {
        super(
            m00, m01, m02,
            m10, m11, m12,
            m20, m21, m22,
        );
    }

    static from(
        m00 = 1, m01 = 0, m02 = 0,
        m10 = 0, m11 = 1, m12 = 0,
        m20 = 0, m21 = 0, m22 = 1,
    ) {
        return new Matrix4(
            m00, m01, m02,
            m10, m11, m12,
            m20, m21, m22,
        );
    }

    static multiply(a, b) {
        const b00 = b[0]; const b01 = b[1]; const b02 = b[2];
        const b10 = b[3]; const b11 = b[4]; const b12 = b[5];
        const b20 = b[6]; const b21 = b[7]; const b22 = b[8];

        const a00 = a[0]; const a01 = a[1]; const a02 = a[2];
        const a10 = a[3]; const a11 = a[4]; const a12 = a[5];
        const a20 = a[6]; const a21 = a[7]; const a22 = a[8];

        const c = new Matrix3();

        c[0] = b00 * a00 + b01 * a10 + b02 * a20;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22;

        c[3] = b10 * a00 + b11 * a10 + b12 * a20;
        c[4] = b10 * a01 + b11 * a11 + b12 * a21;
        c[5] = b10 * a02 + b11 * a12 + b12 * a22;
        
        c[6] = b20 * a00 + b21 * a10 + b22 * a20;
        c[7] = b20 * a01 + b21 * a11 + b22 * a21;
        c[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return c;
    }

    get buffer() {
        return Float32Array.from([
            this[0], this[1], this[2],
            this[3], this[4], this[5],
            this[6], this[7], this[8],
        ]);
    }

    clone() {
        return new Matrix4(
            this[0], this[1], this[2],
            this[3], this[4], this[5],
            this[6], this[7], this[8],
        );
    }

    copy(m) {
        this[0] = m[0]; this[1] = m[1]; this[2] = m[2];
        this[3] = m[3]; this[4] = m[4]; this[5] = m[5];
        this[6] = m[6]; this[7] = m[7]; this[8] = m[8];
        return this;
    }

    debug() {
        const A = this.clone();
        console.log('');
        console.log(A[0], A[1], A[2]);
        console.log(A[3], A[4], A[5]);
        console.log(A[6], A[7], A[8]);
        console.log('');
    }
}
