export class Transform {
    constructor() {
        this.children = [];
    }

    add(object) {
        this.children.push(object);
    }
}
