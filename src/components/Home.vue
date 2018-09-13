<template>
  <div id="wrapper">
    <div id="home-container">
      <div id="editBtn" v-on:click="showPopupDialog = true">Edit</div>
      <div id="section">

        <template v-for="item in data">
          <div class="module" :key="item.itemId">
            <div class="content" v-bind:class="typeData[item.type].class">
              <div class="type">{{ typeData[item.type].type }}</div>
              <div class="name">{{ item.name }}</div>            
            </div>
          </div>

          <template v-if="item.children">
            <div class="module" v-for="subItem in item.children" :key="subItem.subItem">
              <div class="content" v-bind:class="typeData[subItem.type].class">
                <div class="type">{{ typeData[subItem.type].type.replace('[0]', subItem.id) }}</div>
                <div class="name">{{ subItem.name }}</div>            
              </div>
            </div>
          </template>

        </template>
        
      </div>
    </div>

    <Edit v-show="showPopupDialog"/>
    
  </div>
</template>

<script>
import Edit from './Edit.vue'

export default {
  name: 'Home',
  data: function() {
    return{
      showPopupDialog: true,
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
          children: [
            {
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
            }
          ]
        },
        {
          name: "RIGAPS",
          type: 200,
          children: [
            {
              id: 1,
              name: "Accenture",
              type: 210,
              url: "www.accenture.com"
            },
            {
              id: 2,
              name: "RIGAPS",
              type: 210,
              url: "www.rigaps.com"
            },
            {
              id: 3,
              name: "RIGAPS",
              type: 210,
              url: "www.rigaps.com"
            }
          ]
        }        
      ]
    }
  },
  components: {
    Edit
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
