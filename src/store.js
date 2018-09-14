import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPopupDialog: false,
    typeData: {
      "100": {
        type: "End Client",
        class: 'client'
      },
      "110": {
        type: "Client (Tier [0])",
        class: 'client'
      },
      "200": {
        type: "Your Organization",
        class: ''
      },
      "210": {
        type: "Vendor (Tier [0])",
        class: 'vendor'
      }
    },
    data: [
      {
        id: 100,
        name: "Google Client",
        url: "www.google.com",
        children: []
      },
      {
        id: 200,
        name: "RIGAPS",
        children: []
      }        
    ]
  },
  mutations: {
    showHidePopupDialog (state, payload) {
      state.showPopupDialog = payload;
    },
    saveChanges (state, payload) {
      state.data =  _.cloneDeep(payload);
      state.showPopupDialog = false;
    }
  },
  actions: {},
  getters: {
    getPopupDialogState: state => {
      return state.showPopupDialog;
    },
    getData: state => {
      return state.data;
    },
    getTypeData: state => {
      return state.typeData;
    }
  }
})
