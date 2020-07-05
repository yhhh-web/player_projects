<template>
  <div id="app">
<top/>
<index/>
</div>
</template>

<script>
//导入组件
import top from './components/01.top.vue'
import index from './components/02.index.vue'

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
</style>
