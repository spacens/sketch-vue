import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";
import localForage from "localforage";

// Store functionality
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const vuexStorage = new VuexPersist({
  key: "sourcelink",
  storage: localForage
});

// Create a new store
const store = new Vuex.Store({
  plugins: [vuexStorage.plugin],
  actions,
  getters,
  modules,
  mutations,
  state
})

export default store
