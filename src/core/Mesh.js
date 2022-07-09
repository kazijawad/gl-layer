import { Transform } from './Transform.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Matrix3 } from '../math/Matrix3.js';

export class Mesh extends Transform {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;

        this.modelViewMatrix = new Matrix4();
        this.normalMatrix = new Matrix3();
    }

    draw(gl, camera) {
        this.updateWorldMatrix();

        if (camera) {
            this.modelViewMatrix = Matrix4.multiply(camera.viewMatrix, this.worldMatrix);
            this.normalMatrix = Matrix4.normal(this.modelViewMatrix);

            this.program.setUniform('model', this.worldMatrix);
            this.program.setUniform('view', camera.viewMatrix);
            this.program.setUniform('projection', camera.projectionMatrix);

            this.program.setUniform('modelViewMatrix', this.modelViewMatrix);
            this.program.setUniform('normalMatrix', this.normalMatrix);
        }

        this.program.use(gl);
        this.geometry.draw(gl);

        for (const object of this.children) {
            object.draw(gl);
        }
    }
}
