import Shape from "./shape.js";
export default class Line extends Shape{
    constructor({startX, startY, color, alpha, lineWidth}) {
        super({startX, startY, color, alpha, lineWidth});
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setAlpha(ctx);
        this._setEndPoint(x, y);
        this._drawLine(ctx, {x: this.startX, y: this.startY}, {x, y});
        this.selectedColor = "lightblue";
        this.selectedAlpha = 1;
    }
    restore(ctx) {
        this.draw(ctx, this.endX, this.endY );
    }
    select(ctx, x, y) {
        const quotientX = parseFloat(((x - this.endX) / (this.endX - this.startX)).toFixed(2));
        const quotientY = parseFloat(((y - this.endY) / (this.endY - this.startY)).toFixed(2));
        const isSelected = quotientX === quotientY;
        this.setSelected(isSelected);
        if(isSelected) {
           
            let x0, y0, x1, y1, x2, y2, x3, y3;
            console.log('start', this.startX, "end", this.endX);
            if(
                ((this.startX < this.endX) && (this.startY > this.endY)) || 
                ((this.startX > this.endX) && (this.startY < this.endY))
            ) {
                x0 = this.startX - 15;
                y0 = this.startY - 10;

                x1 = this.endX - 15;
                y1 = this.endY - 10;

                x2 = this.endX + 15;
                y2 = this.endY + 10;

                x3 = this.startX + 15;
                y3 = this.startY + 10; 

            } else if (
                ((this.startX < this.endX) && (this.startY > this.endY)) || 
                ((this.startX < this.endX) && (this.startY < this.endY))
            ) {
                x0 = this.startX + 15;
                y0 = this.startY - 10;

                x1 = this.endX + 15;
                y1 = this.endY - 10;

                x2 = this.endX - 15;
                y2 = this.endY + 10;

                x3 = this.startX - 15;
                y3 = this.startY + 10; 
            }
            else if (this.startX === this.endX) {
                x0 = this.startX + 15;
                y0 = this.startY;

                x1 = this.endX + 15;
                y1 = this.endY;

                x2 = this.endX - 15;
                y2 = this.endY;

                x3 = this.startX - 15;
                y3 = this.startY; 
            }
            ctx.save();
            this._setColor(ctx, this.selectedColor);
            this._setAlpha(ctx, this.selectedAlpha);
            ctx.setLineDash([5, 5]);
            this._drawLine(ctx, {x: x0, y: y0}, {x: x1, y: y1});
            this._drawLine(ctx, {x: x1, y: y1}, {x: x2, y: y2});
            this._drawLine(ctx, {x: x2, y: y2}, {x: x3, y: y3});
            this._drawLine(ctx, {x: x3, y: y3}, {x: x0, y: y0});
            ctx.restore();
        }
    }
}