import Curve  from "./curve.js";
export default class Rubber {
    constructor({startX, startY}) {
        this.color = "#fff";
        this.alpha = 1;
        this.lineWidth = 10;
        this.curve = new Curve({
            startX, startY, color: this.color, alpha: this.alpha, lineWidth: this.lineWidth
        });
    }
    draw(ctx, x, y) {
        ctx.save();
        this.curve._setLineWidth(ctx);
        this.curve.draw(ctx, x, y);
        ctx.restore();
    }
    restore(ctx) {
        ctx.save();
        this.curve._setLineWidth(ctx);
        this.curve.restore(ctx);
        ctx.restore();
    }
}