<template>
  <div id="app">
<top/>
<index/>
</div>
</template>

<script>
//导入组件
import top from './components/top.vue'
import index from './components/index.vue'

export default {
  name: 'app',
  components:{
    top,
    index
  }

};
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}

#app {
  height: 100%;
}

#app .top-container {
  height: 60px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

#app .index-container {
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
}

</style>
