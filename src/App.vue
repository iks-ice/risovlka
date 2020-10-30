<template>
  <div id="app">
    <tool-bar />
    <paint-canvas />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import PaintCanvas from './components/PaintCanvas.vue';
export default {
	name: 'App',
	components: {
	ToolBar,
	PaintCanvas,
	}

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
	display: flex;
}
.tool-selected {
	box-shadow: inset 0px 0px 3px 2px rgb(139, 139, 139);
}
</style>
