<template>
  <div id="wrapper">
    <div id="home-container">
      <div id="editBtn" v-on:click="showPopupDialog">Edit</div>
      <div id="section">

        <template v-for="item in data">
          <div class="module" :key="item.id">
            <div class="content" v-bind:class="typeData[item.id].class">
              <div class="type">{{ typeData[item.id].type }}</div>
              <div class="name">{{ item.name }}</div>            
            </div>
          </div>

          <template v-if="item.id == 100 && item.children.length>0">
            <div class="module" v-for="(subItem, subIndex) in item.children.slice().reverse()" :key="subItem.cid">
              <div class="content" v-bind:class="typeData[subItem.type].class">
                <div class="type">{{ typeData[subItem.type].type.replace('[0]', item.children.length - subIndex) }}</div>
                <div class="name">{{ subItem.name }}</div>            
              </div>
            </div>
          </template>
          
          <template v-if="item.id == 200 && item.children.length>0">
            <div class="module" v-for="(subItem, subIndex) in item.children" :key="subItem.vid">
              <div class="content" v-bind:class="typeData[subItem.type].class">
                <div class="type">{{ typeData[subItem.type].type.replace('[0]', subIndex + 1) }}</div>
                <div class="name">{{ subItem.name }}</div>            
              </div>
            </div>
          </template>

        </template>
        
      </div>
    </div>

    <Edit v-show="getPopupDialogState"/>
    
  </div>
</template>

<script>
import Edit from './Edit.vue'

export default {
  name: 'Home',
  components: {
    Edit
  },
  data() {
    return{
      typeData: this.$store.state.typeData,
      data: this.$store.state.data
    }
  },
  computed: {
    getPopupDialogState() {
      return this.$store.getters.getPopupDialogState;
    },
    getTypeData() {
      return this.$store.getters.getTypeData;
    },
    getData() {
      return this.$store.getters.getData;
    }
  },
  methods: {
    showPopupDialog() {
      this.$store.commit('showHidePopupDialog', true);
    }
  },
  watch: {
    getData(n, o){
      this.data = n;
    }
  }
}
</script>

<style scoped lang="less">
  #wrapper {
    position: relative;
    #home-container {
      width: 80%;
      border: 1px solid #dfdefe;
      border-radius: 6px;
      position: relative;
      margin: auto;
      padding: 30px 0px;
      
      #section {
        .module {
          border: 1px solid #dfdfdf;
          margin: 40px;
          display: inline-block;
          border-radius: 6px;
          text-align: left;
          min-width: 120px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, 0), 0 1px 8px 0 rgba(0, 0, 0, 0);
          position: relative;
          &:not(:last-child){
            &::after {
              content: " ";
              display: block;
              position: absolute;
              height: 1px;
              background: #dfdfdf;
              width: 40px;
              left: 100%;
              top: calc(50% - 2px);
            }
          }
          &:not(:first-child){
            &::before {
              content: " ";
              display: block;
              position: absolute;
              height: 1px;
              background: #dfdfdf;
              width: 42px;
              left: -42px;
              top: calc(50% - 2px);
            }
          }
          .content{
            position: relative;
            padding: 10px 20px;
            &.client, &.vendor{
              &::before, &::after {
                border-right: 1px solid #dfdfdf;
                content: '';
                display: block;
                height: 7px;
                margin-top: -5px;
                position: absolute;
                top: calc(50% - 2px);
                width: 0;
              }
            }
            &.client{
              &::before, &::after {
                right: -4px;
              }
              &::before {
                -moz-transform: rotate(-135deg);
                -o-transform: rotate(-135deg);
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
              }
              &::after {
                margin-top: 0px;
                height: 6px;
                -moz-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
              }
            }
            &.vendor{
              &::before, &::after {
                left: -3px;
              }
              &::before {
                -moz-transform: rotate(135deg);
                -o-transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
              }
              &::after {
                margin-top: 0px;
                height: 6px;
                -moz-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
              }
            }
            .type {
              color: #777777;
              margin-bottom: 5px;
              font-size: 11px;
            }
            .name {
              color: #123262;
              font-weight: bold;
              font-size: 11px;
            }
          }
        }
      }

      #editBtn {
        color: #428ce8;
        font-style: italic;
        font-weight: bold;
        position: absolute;
        top: 30px;
        right: 50px;
        cursor: pointer;
      }
    } 
  }
</style>
