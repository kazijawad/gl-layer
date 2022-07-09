import { Transform } from './Transform.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Vector3 } from '../math/Vector3.js';

class Camera extends Transform {
    constructor() {
        super();

        this.viewMatrix = new Matrix4();
    }

    updateWorldMatrix() {
        super.updateWorldMatrix();

        this.viewMatrix.inverse(this.worldMatrix);
    }

    lookAt(v) {
        this.localMatrix = Matrix4.lookAt(this.position, v, Vector3.from(0, 1, 0));
        this.rotation = this.localMatrix.rotation();
    }
}

export class OrthographicCamera extends Camera {
    constructor(left, right, bottom, top, near, far) {
        super();

        this.projectionMatrix = Matrix4.orthographic(left, right, bottom, top, near, far);
    }
}

export class PerspectiveCamera extends Camera {
    constructor(fov, aspect, near, far) {
        super();

        this.projectionMatrix = Matrix4.perspective(fov, aspect, near, far);
    }
}
