let id = 0;
class Shape {
    constructor({startX, startY, color, alpha, lineWidth}) {
        this.id = id++;
        this.startX = startX;
        this.startY = startY;
        this.color = color;
        this.alpha = alpha;
        this.lineWidth = lineWidth;
        this.isDrawn = false;
    }
    _setDrawn() {
        setTimeout(() => this.isDrawn = true, 500);
    }
    _setEndPoint(x, y) {
        this.endX = x;
        this.endY = y;
    }
    _setColor(ctx, color = this.color) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    }
    _setAlpha(ctx, alpha = this.alpha) {
        ctx.globalAlpha = alpha;
    }
    _drawLine = (ctx, from, to) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.closePath();
        ctx.stroke();
    }
    setColor(color) {
        this.color = color;
    }
    _setLineWidth(ctx) {
        ctx.lineWidth = this.lineWidth;
    }
}

class Line extends Shape{
    constructor({startX, startY, color, alpha, lineWidth}) {
        super({startX, startY, color, alpha, lineWidth});
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setAlpha(ctx);
        this._setEndPoint(x, y);
        this._drawLine(ctx, {x: this.startX, y: this.startY}, {x, y});
        this._setDrawn();
        this.selectedColor = "lightblue";
        this.selectedAlpha = 0.5;
    }
    restore(ctx) {
        this.draw(ctx, this.endX, this.endY );
    }
    isSelected(x, y) {
        const quotientX = parseFloat(((x - this.endX) / (this.endX - this.startX)).toFixed(1));
        const quotientY = parseFloat(((y - this.endY) / (this.endY - this.startY)).toFixed(1));
        return quotientX === quotientY;
    }
    select(ctx, x, y) {
        if(this.isSelected(x, y)) {
            console.log(`=== Shape id: ${this.id} isSelected`);
            let x0, y0, x1, y1, x2, y2, x3, y3;
            // if(
            //     ((this.startX < this.endX) && (this.startY > this.endY)) || 
            //     ((this.startX > this.endX) && (this.startY < this.endY))
            // ) {
                x0 = this.startX - 15;
                y0 = this.startY - 15;

                x1 = this.endX - 15;
                y1 = this.endY - 15;

                x2 = this.endX + 15;
                y2 = this.endY + 15;

                x3 = this.startX + 15;
                y3 = this.startY + 15; 

            // }
            ctx.save();
            console.log('draw selected rect');
            this._setColor(ctx, this.selectedColor);
            this._setAlpha(ctx, this.selectedAlpha);
            this._drawLine(ctx, {x: x0, y: y0}, {x: x1, y: y1});
            this._drawLine(ctx, {x: x1, y: y1}, {x: x2, y: y2});
            this._drawLine(ctx, {x: x2, y: y2}, {x: x3, y: y3});
            this._drawLine(ctx, {x: x3, y: y3}, {x: x0, y: y0});
            ctx.restore();
        }
    }
}

class Rectangle {
    constructor({startX, startY, color, alpha, lineWidth}) {
        this.line = new Line({startX, startY, color, alpha, lineWidth});
    }
    draw(ctx, x, y) {
        this.line._setColor(ctx);
        this.line._setAlpha(ctx);
        this.line._setEndPoint(x, y);
        this.line._drawLine(ctx, {x: this.line.startX, y: this.line.startY}, {x, y: this.line.startY});
        this.line._drawLine(ctx, {x: this.line.startX, y: this.line.startY}, {x: this.line.startX, y});
        this.line._drawLine(ctx, {x: this.line.startX, y}, {x, y});
        this.line._drawLine(ctx, {x, y: this.line.startY}, {x, y});
    }
    restore(ctx) {
        this.draw(ctx, this.line.endX, this.line.endY);
    }
}
class Curve extends Shape {
    constructor({startX, startY,color, alpha, lineWidth}) {
        super({startX, startY, color, alpha, lineWidth});
        this.coord = [{x: startX, y: startY}];
        this._setEndPoint(startX, startY);
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setAlpha(ctx);
        this.coord.push({x, y});
        this._drawLine(ctx, {x: this.endX, y: this.endY}, {x, y});
        this._setEndPoint(x, y);
    }
    restore(ctx) {
        let i = 0;
        this._setColor(ctx);
        this._setAlpha(ctx);
        while (i < this.coord.length - 1) {
            const startX = this.coord[i].x;
            const startY = this.coord[i].y;
            const endX = this.coord[i+1].x;
            const endY = this.coord[i+1].y;
            this._drawLine(ctx, {x: startX, y: startY}, {x: endX, y: endY});
            i++;
        }
    }
}

class Rubber {
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

class Circle extends Shape {
    constructor({startX, startY, color, alpha}) {
        super({startX, startY, color, alpha});
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setAlpha(ctx);
        ctx.beginPath();
        const xComp = x-this.startX;
        const yComp = y-this.startY;
        const xCenter = this.startX + xComp / 2;
        const yCenter = this.startY + yComp / 2;
        const radius = Math.sqrt(Math.pow(xComp, 2) + Math.pow(yComp, 2))/2;
        ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.stroke();
        this._setEndPoint(x, y);
    }
    restore(ctx) {
        this.draw(ctx, this.endX, this.endY);
    }
}


const shapes = {
    "Line": Line,
    "Curve": Curve,
    "Rectangle": Rectangle,
    "Circle": Circle,
    "Rubber": Rubber,
};

const toolFabric = (type) => {
    return shapes[type]
};

export default toolFabric;