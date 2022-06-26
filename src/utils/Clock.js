export class Clock {
    constructor() {
        this.elapsedTime = 0;
        this.pastTime = performance.now();
    }

    get time() {
        const currentTime = performance.now();

        this.elapsedTime += (currentTime - this.pastTime) / 1000;
        this.pastTime = currentTime;

        return this.elapsedTime;
    }
}
