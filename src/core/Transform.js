import { Vector3 } from '../math/Vector3.js';
import { Matrix4 } from '../math/Matrix4.js';

export class Transform {
    constructor() {
        this.children = [];

        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3(1);

        this.localMatrix = new Matrix4();
        this.worldMatrix = new Matrix4();
    }

    add(object) {
        this.children.push(object);
    }

    remove(object) {
        this.children.splice(this.children.indexOf(object), 1);
    }

    updateWorldMatrix(parentWorldMatrix) {
        this.updateLocalMatrix();

        if (parentWorldMatrix) {
            this.worldMatrix = Matrix4.multiply(parentWorldMatrix, this.localMatrix);
        } else {
            this.worldMatrix.copy(this.localMatrix);
        }

        for (const child of this.children) {
            child.updateWorldMatrix(this.worldMatrix);
        }
    }

    updateLocalMatrix() {
        this.localMatrix.compose(this.position, this.rotation, this.scale);
    }
}
