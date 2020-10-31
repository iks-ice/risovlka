class Shape {
    constructor(startX, startY, color) {
        this.startX = startX;
        this.startY = startY;
        this.color = color;
    }
    _setEndPoint(x, y) {
        this.endX = x;
        this.endY = y;
    }
    setColor(color) {
        this.color = color;
    }
    _setColor(ctx) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
    }
    _drawLine = (ctx, from, to) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.closePath();
        ctx.stroke();
    }
}

class Line extends Shape{
    constructor(startX, startY, color) {
        super(startX, startY, color);
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setEndPoint(x, y);
        this._drawLine(ctx, {x: this.startX, y: this.startY}, {x, y});
    }
    restore(ctx) {
        this.draw(ctx, this.endX, this.endY );
    }
}

class Rectangle{
    constructor(startX, startY, color) {
        this.line = new Line(startX, startY, color);
    }
    draw(ctx, x, y) {
        this.line._setColor(ctx);
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
    constructor(startX, startY,color) {
        super(startX, startY, color);
        this.coord = [{x: startX, y: startY}];
        this._setEndPoint(startX, startY);
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this.coord.push({x, y});
        this._drawLine(ctx, {x: this.endX, y: this.endY}, {x, y});
        this._setEndPoint(x, y);
    }
    restore(ctx) {
        let i = 0;
        this._setColor(ctx);
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

class Circle extends Shape {
    constructor(startX, startY, color) {
        super(startX, startY, color);
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
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
};

const toolFabric = (type) => {
    return shapes[type]
};

export default toolFabric;