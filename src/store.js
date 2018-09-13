import Vue from 'vue'
import Vuex from 'vuex'

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
        children: [{
            id: 111,
            name: "Accenture",
            type: 110,
            url: "www.accenture.com"
          },
          {
            id: 222,
            name: "RIGAPS",
            type: 110,
            url: "www.rigaps.com"
          }]
      },
      {
        id: 200,
        name: "RIGAPS",
        children: [{
            id: 121,
            name: "Accenture",
            type: 210,
            url: "www.accenture.com"
          },
          {
            id: 122,
            name: "RIGAPS",
            type: 210,
            url: "www.rigaps.com"
          }]
      }        
    ]
  },
  mutations: {
    showHidePopupDialog (state, payload) {
      state.showPopupDialog = payload;
    },
    saveChanges (state, payload) {
      state.data = payload;
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
