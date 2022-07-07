import { Vector3 } from '../math/Vector3.js';
import { MathUtils } from '../utils/MathUtils.js';

export class Camera {
    constructor(position, yaw = -90, pitch = 0) {
        this.position = position;

        this.yaw = yaw;
        this.pitch = pitch;

        this.speed = 2.5;
        this.sensitivity = 0.1;
        this.zoom = 45;

        this.up = new Vector3(0, 1, 0);
        this.front = new Vector3(0, 0, -1);

        this.update();
    }

    update() {
        const direction = new Vector3();
        direction.x = Math.cos(MathUtils.Radian(this.yaw)) * Math.cos(MathUtils.Radian(this.pitch));
        direction.y = Math.sin(MathUtils.Radian(this.pitch));
        direction.z = Math.sin(MathUtils.Radian(this.yaw)) * Math.cos(MathUtils.Radian(this.pitch));

        this.front = direction.normalize();
        this.right = this.front.cross(this.up).normalize();
        this.up = this.right.cross(this.front).normalize();
    }
};
