<template>
  <div id="edit-container">
    <div id="popupDialog">
      <header>
        <div id="title">Your link to End-client</div>
      </header>
      <section>
        <div id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris</div>
          <div id="formSection">

            <div class="formGroup">
              <div class="formItem">
                <label>End Client Name</label>
                <input type="text" value="Google" disabled/>
              </div>
              <div class="formItem">
                <label>End Client Website</label>
                <input type="text" value="www.google.com" disabled/>
              </div> 
            </div>

            <div class="inputGroup">
              <div class="addBtn" v-on:click="addClientModule(null)">+</div>
              <label>Add Another Client</label>
            </div>

            <template v-for="item in data[0].children">
              <div class="formGroup" :key="'item'+item.cid">
                <div class="formItem">
                  <label>Client Name</label>
                  <input type="text" v-model="item.name" v-bind:class="{ required : validateNameField(item) }"/>
                  <div class="requiredMsg" v-show="validateNameField(item)">{{ requiredMessage }}</div>
                </div>
                <div class="formItem">
                  <label>Client Website</label>
                  <input type="text" v-model="item.url" v-bind:class="{ required : validateUrlField(item) }"/>
                  <div class="requiredMsg" v-show="validateUrlField(item)">{{ requiredMessage }}</div>
                </div>
                <div class="removeBtn" v-on:click="removeClientModule(item.cid)">x</div>
              </div>

              <div class="inputGroup" :key="'button'+item.cid">
                <div class="addBtn" v-on:click="addClientModule(item.cid)">+</div>
                <label>Add Another Client</label>
              </div>
            </template>
          
            <div class="formGroup">
              <div class="formItem">
                <label>Your Organization</label>
                <input type="text" value="RIGAPS" disabled/>
              </div>
            </div>

            <div class="inputGroup">
              <div class="addBtn" v-on:click="addVendorModule(null)">+</div>
              <label>Add Another Vendor</label>
            </div>

            <template v-for="item in data[1].children">
              <div class="formGroup" :key="'item'+item.vid">
                <div class="formItem">
                  <label>Vendor Name</label>
                  <input type="text" v-model="item.name" v-bind:class="{ required : validateNameField(item) }"/>
                  <div class="requiredMsg" v-show="validateNameField(item)">{{ requiredMessage }}</div>
                </div>
                <div class="formItem">
                  <label>Vendor Website</label>
                  <input type="text" v-model="item.url" v-bind:class="{ required : validateUrlField(item) }"/>
                  <div class="requiredMsg" v-show="validateUrlField(item)">{{ requiredMessage }}</div>
                </div>
                <div class="removeBtn" v-on:click="removeVendorModule(item.vid)">x</div>
              </div>

              <div class="inputGroup" :key="'button'+item.vid">
                <div class="addBtn" v-on:click="addVendorModule(item.vid)">+</div>
                <label>Add Another Vendor</label>
              </div>
            </template>

          </div>
      </section>
      <footer>
        <div class="btnGroup">
          <button v-on:click="hidePopupDialog">Cancel</button>
          <button v-on:click="saveChanges">Update</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'Edit',
  data() {
    return{
      data: _.cloneDeep(this.$store.getters.getData),
      requiredMessage: 'This field can’t be left blank.'
    }
  },
  computed: {},
  methods: {
    generateUUID() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    hidePopupDialog() {
      this.data = _.cloneDeep(this.$store.getters.getData);
      this.$store.commit('showHidePopupDialog', false);
    },
    validateNameField(item) {
      return item.name == '' && item.nameValidation;
    },
    validateUrlField(item) {
      return item.url == '' && item.urlValidation;
    },
    saveChanges() {
      var ccount = _.filter(this.data[0].children, (o) => {
        o.nameValidation = (o.name == '' ? true : false);
        o.urlValidation = (o.url == '' ? true : false);
        return o.nameValidation || o.urlValidation;
      });
      var vcount = _.filter(this.data[1].children, (o) => {
        o.nameValidation = (o.name == '' ? true : false);
        o.urlValidation = (o.url == '' ? true : false);
        return o.nameValidation || o.urlValidation;
      });

      if(ccount.length == 0 && vcount.length == 0){
        this.$store.commit('saveChanges', this.data);
      }
    },
    addClientModule(_id) {
      var cobject = {
        cid: this.generateUUID(),
        name: '',
        type: 110,
        url: '',
        nameValidation: false,
        urlValidation: false
      };
      
      if(_id){
        this.data[0].children.splice(_.findIndex(this.data[0].children, (o) => o.cid == _id) + 1, 0, cobject);
      }else{
        this.data[0].children.unshift(cobject);
      }
    },
    removeClientModule(_id) {
      this.data[0].children = _.filter(this.data[0].children, (o) => o.cid != _id);
    },
    addVendorModule(_id) {
      var vobject = {
        vid: this.generateUUID(),
        name: '',
        type: 210,
        url: '',
        nameValidation: false,
        urlValidation: false
      };

      if(_id){
        this.data[1].children.splice(_.findIndex(this.data[1].children, (o) => o.vid == _id) + 1, 0, vobject);
      }else{
        this.data[1].children.unshift(vobject);
      }
    },
    removeVendorModule(_id) {
      this.data[1].children = _.filter(this.data[1].children, (o) => o.vid != _id);
    }
  }
}
</script>

<style scoped lang="less">
  #edit-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
    #popupDialog{
      min-width: 700px;
      width: 62%;
      background-color: #ffffff;
      margin: 100px auto;
      display: inline-block;
      border-radius: 4px;
      header{
        border-bottom: 1px solid #dfdfdf;
        #title{
          margin: 25px 40px;
          font-weight: bold;
          text-align: left;
          font-size: 16px;
        }
      }
      section{
        padding: 30px 40px;
        text-align: left;
        font-size: 12px;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 400px;
        &::-webkit-scrollbar {
          width: 6px;
          margin: 2px 4px;
          background-color: #F5F5F5;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(0,0,0,.3);
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
          background-color: #868686;
        }
        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0,0,0,.3);
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
          border-radius: 10px;
          background-color: #fff;
        }
        #description{
          color: #636363;
        }
        #formSection{
          color: #3c3c3c;
          margin: 20px 0px;
          .formGroup{
            text-align: left;
            margin-left: 30px;
            position: relative;
            &::before {
              content: " ";
              display: block;
              position: absolute;
              height: 1px;
              background: #dfdfdf;
              width: 20px;
              left: -20px;
              top: 35px;
            }
            .formItem{
              width: 225px;
              display: inline-block;
              margin-right: 15px;
              position: relative;
              input{
                padding: 8px 10px;
                margin-top: 5px;
                border-radius: 5px;
                border: 1px solid #dcdcdc;
                width: 200px;
                &[disabled]{
                  color: #3c3c3c;
                  background-color: #dcdcdc;
                }
                &.required{
                  border-color: #d50921;
                }
              }
              .requiredMsg{
                font-size: 10px;
                color: #d50921;
                position: absolute;
                bottom: -16px;
                left: 2px;
              }
            }
            .removeBtn{
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 1px solid #d50921;
              border-radius: 50%;
              color: #d50921;
              text-align: center;
              font-size: 14px;
              line-height: 20px;
              vertical-align: middle;
              cursor: pointer;
              user-select: none;
            }
          }
          .inputGroup{
            margin: 20px 0px;
            position: relative;
            &::before {
              content: " ";
              display: block;
              position: absolute;
              height: 38px;
              background: #dfdfdf;
              width: 1px;
              left: 10px;
              top: -38px;
            }
            &:not(:last-child){
              &::after {
                content: " ";
                display: block;
                position: absolute;
                height: 55px;
                background: #dfdfdf;
                width: 1px;
                left: 10px;
                top: 22px;
              }
            }
            .addBtn{
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 1px solid #5596e7;
              border-radius: 50%;
              color: #5596e7;
              text-align: center;
              font-size: 16px;
              line-height: 20px;
              vertical-align: middle;
              cursor: pointer;
              user-select: none;
            }
            label{
              font-weight: bold;
              font-style: italic;
              vertical-align: middle;
              margin-left: 10px;
            }
          }
        }
      }
      footer{
        border-top: 1px solid #dfdfdf;
        .btnGroup{
            margin: 20px 30px;
          button{
            border: 1px solid #123262;
            color: #123262;
            font-weight: bold;
            font-size: 13px;
            padding: 6px 20px;
            border-radius: 5px;
            margin: 0px 10px;
            cursor: pointer;
            user-select: none;
            background-color: #ffffff;
            outline: none;
            &:hover{
              background-color: #123262;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
