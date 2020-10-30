<template>
	<div class="toolbar">
		<div v-for="tool in tools" :key="tool.id" >
			<base-icon :tool="tool" :isSelected="toolSelected===tool"/>
		</div>
		<color-picker />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import BaseIcon from "./BaseIcon.vue";
import ColorPicker from "./ColorPicker.vue";
export default {
	name: 'ToolBar',
	components: {
		BaseIcon,
		ColorPicker,
	},
	computed: {
		...mapState(["tools", "toolSelected"]),
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.toolbar {
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  min-width: 50px;
  height: 100vh;
  background: rgb(115, 178, 230);
  border-right: 1px solid rgb(4, 0, 255);
}
</style>
