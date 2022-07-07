import { Transform } from './Transform.js';

export class Mesh extends Transform {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
    }

    draw(gl) {
        this.updateWorldMatrix();

        this.program.use(gl);
        this.geometry.draw(gl);

        for (const object of this.children) {
            object.draw(gl);
        }
    }
}
