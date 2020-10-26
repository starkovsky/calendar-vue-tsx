import Vue from 'vue';
import Vuex from 'vuex';
import { createVuexStore } from 'vuex-simple';
import { MyStore } from './store';

Vue.use(Vuex);

const store = new MyStore();

export default createVuexStore(store, {
  strict: false,
  // modules: {},
  // plugins: []
});
