import Line from "./line.js";
import Curve from "./curve.js";
import Rectangle from "./rectangle.js";
import Circle from "./circle.js";
import Rubber from "./rubber.js";

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