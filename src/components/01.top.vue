<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      
      <div class="img-top"><img src="../assets/top.png"></div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="inputValue"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
      inputValue: ''
      }
    },
    methods:{
      toResult(){
        if(this.inputValue == ''){
          this.$message.warning('请输入内容')
        }else{
          this.$router.push('/result?q=' + this.inputValue)
        }
      }
    }
  }
</script>

<style scoped>
.img-top img{
  float:right;
}
</style>
