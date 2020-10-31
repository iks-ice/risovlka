<template>
   <div class="palette--wrapper" v-show="isOpen">
        <div class="header">
            <input v-model="color"/>
            <input v-model="alpha" placeholder="'Trancperancy'" type="range" min="0" max="1"
                step="0.1"
            />
        </div>
        <div class="main">
            <div ref="paletteWrapper" class="canvas--wrapper">
                <canvas ref="palette" id="palette"
                    @click="click"
                >
                    Your browser doesnt support this feature
                </canvas>
            </div>
        </div>
        <img ref="palettePic" src="../assets/palette.jpeg" >
    </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
    name: 'ColorPalette',
    props:["isOpen"],
    data () {
        return {
            color: "#3452ae",
            alpha: 1,
            width: 0,
            height: 0,
        };
    },
    computed: {
        ctx () {
            return this.$refs.palette.getContext("2d");
        },
    },
    watch: {
        isOpen(newVal) {
            newVal && setTimeout(() => {
                this.setCanvasDimensions(); 
                this.drawGradient();
            });
        },
        alpha(val) {
            this.ctx.globalAlpha = val;
            this.drawGradient();
        }
    },
    methods: {
        ...mapMutations(["setColor"]),
        click({offsetX:x, offsetY:y}) { //{offsetX:startX, offsetY:startY}
           const color = this.pickColor(x, y);
           console.log(color);
           this.setColor(color);
        },
        move() { //{offsetX, offsetY}

        },
        setCanvasDimensions() {
            this.width = this.$refs.paletteWrapper.offsetWidth;
            this.ctx.canvas.width = this.width
            this.height = this.$refs.paletteWrapper.offsetHeight;
            this.ctx.canvas.height = this.height;
        },
        drawGradient() {
            this.ctx.globalAlpha = this.alpha;
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.$refs.palettePic, 0, 0, this.width, this.height);
            
        },
        pickColor(x, y) {
            const imgData = this.ctx.getImageData(0, 0, this.width, this.height);
            const getPixelColor = (indexColor) => () => imgData.data[4 * (x + this.width * y) + indexColor];
            const r = getPixelColor(0);
            const g = getPixelColor(1);
            const b = getPixelColor(2);
            const a = getPixelColor(3);
            return `rgba(${r()}, ${g()}, ${b()}, ${(a()/255).toFixed(1)})`;
        }
    }
}
</script>

<style lang="less" scoped>
    .palette--wrapper {
        display: flex;
        flex-direction: column;
        border: 2px solid lightblue;
        position: absolute;
        top: -50px;
        left: 50px;
        width: 300px;
        height: 200px;
        z-index: 1000;
        .header {
            padding: 10px;
            border-bottom: 1px solid lightblue;
        }
        .main {
            position: relative;
            height: 100%;
            .canvas--wrapper {
                position: absolute;
                top: 0;
                left: 0;
                align-self: stretch;
                width: 100%;
                height: 100%;
            }
        }
        img {
            display: none;
        }
    }
</style>