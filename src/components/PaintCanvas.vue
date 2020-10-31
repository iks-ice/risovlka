<template>
    <div ref="canvasWrapper" class="canvas-wrapper">
        <canvas ref="canvas" id="canvas"
            @mousedown="click"
            @mousemove="move"
            @mouseup="click"
        >Your browser doesnt support this feature</canvas>
    </div>
</template>

<script>
import {mapState} from "vuex";
import toolFabric from "./shapes/index.js"
export default {
    name: 'PaintCanvas',
    data () {
        return {
            isDrawing: false,
            shapes: [],
            currentTool: null,
        };
    },
    computed: {
        ...mapState(["tools", "toolSelected", "color", "alpha"]),
        ctx () {
            return this.$refs.canvas.getContext("2d");
        },
    },
    watch: {
        // coord: function () {
        //     if (this.toolSelected==="") {
        //         return;
        //     }
        //     this.draw();
        // }
    },
    methods: {
        click({offsetX:startX, offsetY:startY}) {
            this.isDrawing = !this.isDrawing;
            if (this.isDrawing && this.toolSelected) {
                const Tool = toolFabric(this.toolSelected);
                this.currentTool = Tool && new Tool(startX, startY, this.color, this.alpha);
            } else {
               this.addToDrawn();
            }
        },
        move({offsetX, offsetY}) {
            if (!(this.isDrawing && this.currentTool)) {
                return;
            }
            this.draw(offsetX, offsetY);
        },
        addToDrawn() {
            this.currentTool && this.shapes.push(this.currentTool);
        },
        rerenderDrawings() {
            this.shapes.forEach(shape => shape && shape.restore(this.ctx));
        },
        cancelDrawn({keyCode, ctrlKey}) {
            if (keyCode === 90 && ctrlKey) {
                this.shapes.pop();
            }
        },
        draw (x, y) {
            if (this.isDrawing && this.currentTool) {
                if (this.toolSelected !== 'Curve') {
                    this.clearAll();
                    this.rerenderDrawings();
                }
                this.currentTool.draw(this.ctx, x, y);
            }
        },
        clearAll() {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    },
    mounted() {
        document.addEventListener('keydown', (e) => {
            this.cancelDrawn(e);
            this.clearAll();
            this.rerenderDrawings();
        });
        this.ctx.canvas.width = this.$refs.canvasWrapper.offsetWidth;
        this.ctx.canvas.height = this.$refs.canvasWrapper.offsetHeight;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.canvas-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
}
</style>