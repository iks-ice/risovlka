<template>
    <div class="wrapper" @click="click">
        <div class="title">
            Palette
        </div>
        <color-palette :isOpen="isOpen"/>
    </div>
</template>

<script>
import ColorPalette from "./ColorPalette.vue"
export default {
    name: 'ColorPicker',
    components: {
        ColorPalette,
    },
    data () {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggle(e) {
            const el = e.target.closest('.palette--wrapper');
            if(!el) {
                this.isOpen = !this.isOpen;
            }
        },
        click(e) { 
            this.toggle(e)
        },
    },
}
</script>

<style lang="less" scoped>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 40px;
        height: 40px;
        background: rgb(228, 228, 228);
        transition: background .2s linear;
        border: 1px solid rgb(0, 0, 0);
        .title {
            cursor: pointer;
            width:100%;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>