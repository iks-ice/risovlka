import Vue from "vue";
import Vuex from "vuex";
import tools from "./tools.js"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tools,
        toolSelected: '',
        color: "#000",
        alpha: 1,
    },
    getters: {
        color(state) {
            return state.color;
        },
    },
    mutations: {
        setTool (state, tool) {
            state.toolSelected = tool;
        },
        setColor(state, color) {
            state.color = color;
        },
        setTransparency(state, alpha) {
            state.alpha = alpha;
        }
    }
  });

  export default store;