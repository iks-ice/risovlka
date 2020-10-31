<template>
   <div class="palette--wrapper" v-show="isOpen">
        <div class="header">
            <input v-model="color"/>
            <input type="checkbox" v-model="checked" @change="changeColorSys">
            <span>{{colorSys}}</span>
            <input v-model="alpha" placeholder="'Trancperancy'" type="range" min="0" max="1"
                step="0.01"
            />
            <span>{{alpha}}</span>
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
            color: "#000",
            alpha: 1,
            width: 0,
            height: 0,
            checked: false,
        };
    },
    computed: {
        ctx () {
            return this.$refs.palette.getContext("2d");
        },
        colorSys() {
            return this.checked ? "RGB" : "HEX";
        }
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
            this.setTransparency(val);
            this.drawGradient();
        },
        color (val) {
            this.setColorDebouced(val);
        },
    },
    methods: {
        ...mapMutations(["setColor", "setTransparency"]),
        click({offsetX:x, offsetY:y}) { 
           this.color = this.pickColor(x, y);
           this.setColor(this.color);
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
        rgbToHex(color) {
            const toHex = (n) => {
                const hex = Number(n).toString(16);
                return hex.length === 1 ? `0${hex}` : hex;
            };
            const hex = color.slice(4).slice(0, -1).split(",").map(toHex);
            const [rHex, gHex, bHex] = hex;
            return `#${rHex}${gHex}${bHex}`;
        },
        hexToRgb(color) {
            const digits = color.slice(1);
            let rgb;
            if (digits.length === 3) {
                rgb = digits.split("").map(d => parseInt(`0x${d}`, 16));
            }
            else if (digits.length === 6) {
                rgb = digits.replace(/../g, '$&,').split(",")
                .slice(0, 3)
                .map(d => parseInt(`0x${d}`, 16));
            }
            const [r, g, b] = rgb;
            return `rgb(${r},${g},${b})`;
        },
        pickColor(x, y) {
            const imgData = this.ctx.getImageData(0, 0, this.width, this.height);
            const getPixelColor = (indexColor) => () => imgData.data[4 * (x + this.width * y) + indexColor];
            const r = getPixelColor(0);
            const g = getPixelColor(1);
            const b = getPixelColor(2);
            const color = `rgb(${r()},${g()},${b()})`;
            return  this.colorSys === "RGB" ? color : this.rgbToHex(color);
        },
        changeColorSys(e) {
            this.color = e.target.checked ? 
                this.hexToRgb(this.color) :
                this.rgbToHex(this.color);
        },
        debounce(fn, delay) {
            return (...args) => {
                setTimeout(() => fn.apply(this, args), delay);
            }
        }
    },
    mounted() {
        this.setColorDebouced = this.debounce(this.setColor, 100);
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