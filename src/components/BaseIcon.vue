<template>
  <div class="icon" :class="{'tool-selected': isSelected}" @click="selectTool">
      {{tool}}
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    
    name: 'BaseIcon',
    props: ["tool", "isSelected"],
    data() {
        return {}
    },
    methods: {
        ...mapMutations(["setTool"]),
        selectTool() {
            this.setTool(this.tool);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: rgb(228, 228, 228);
    transition: background .2s linear;
    border: 1px solid rgb(0, 0, 0);
    cursor: pointer;
}
</style>
