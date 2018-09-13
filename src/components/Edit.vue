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
              <div class="removeBtn">x</div>
            </div>
            <div class="inputGroup">
              <div class="addBtn">+</div>
            </div>
          </div>
      </section>
      <footer>
        <div class="btnGroup">
          <button v-on:click="showPopupDialog = false">Cancel</button>
          <button>Update</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edit'
}
</script>

<style scoped lang="less">
  #edit-container {
    position: absolute;
    width: 100%;
    height: 1000px;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    #popupDialog{
      width: 800px;
      width: 62%;
      background-color: #ffffff;
      margin: auto;
      display: inline-block;
      border-radius: 4px;
      margin-top: 100px;
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
        height: 300px;
        font-size: 12px;
        #description{
          color: #636363;
        }
        #formSection{
          .formGroup{
            .removeBtn{
              display: inline-block;
              width: 22px;
              height: 22px;
              border: 1px solid #d50921;
              border-radius: 50%;
              color: #d50921;
              text-align: center;
              font-size: 16px;
              line-height: 18px;
              vertical-align: middle;
            }
          }
          .inputGroup{
            .addBtn{
              display: inline-block;
              width: 22px;
              height: 22px;
              border: 1px solid #5596e7;
              border-radius: 50%;
              color: #5596e7;
              text-align: center;
              font-size: 16px;
              line-height: 20px;
              vertical-align: middle;
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
