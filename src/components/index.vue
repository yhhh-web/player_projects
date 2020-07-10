<template>
  <div class="index-container">
    <!-- 主体区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio :src='musicUrl' controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      musicUrl:""
    };
  }
};
</script>

<style>

.index-container {
  /* display: flex; */
  width: 100%;
}

.index-container .main {
  flex: 1;
  background: rgba(242, 167, 116, 0.2);
}

.index-container .main > div {
  /* max-width: 1100px; */
  margin: 0 auto;
}

.index-container .player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.index-container audio {
  width: 100%;
  border-radius: none;
  outline: none;
}

</style>
