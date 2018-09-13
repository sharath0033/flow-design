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
          name: "Google Client",
          type: 100,
          url: "www.google.com",
          children: [{
              id: 2,
              name: "Accenture",
              type: 110,
              url: "www.accenture.com"
            },
            {
              id: 1,
              name: "RIGAPS",
              type: 110,
              url: "www.rigaps.com"
            }]
        },
        {
          name: "RIGAPS",
          type: 200,
          children: [{
              id: 2,
              name: "Accenture",
              type: 110,
              url: "www.accenture.com"
            },
            {
              id: 1,
              name: "RIGAPS",
              type: 110,
              url: "www.rigaps.com"
            }]
        }        
      ]
  },
  mutations: {
    setPopupDialogState (state, payload) {
      state.showPopupDialog = payload
    },
  },
  actions: {
    showHidePopupDialog ({commit}, payload) {
      commit('setPopupDialogState', payload)
    },
    saveChanges({commit}) {

      commit('setPopupDialogState', false)
    }
  },
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
