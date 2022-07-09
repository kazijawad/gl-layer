import { Transform } from './Transform.js';

export class Mesh extends Transform {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
    }

    draw(gl, camera) {
        this.updateWorldMatrix();

        if (camera) {
            this.program.setUniform('model', this.worldMatrix);
            this.program.setUniform('view', camera.viewMatrix);
            this.program.setUniform('projection', camera.projectionMatrix);
        }

        this.program.use(gl);
        this.geometry.draw(gl);

        for (const object of this.children) {
            object.draw(gl);
        }
    }
}
