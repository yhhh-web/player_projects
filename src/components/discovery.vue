<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-row  class="hidden-xs-only">
        <el-col :span="24">
          <el-carousel class :interval="4000" type="card" >
            <!-- 循环获取到的接口数据 -->
            <el-carousel-item v-for="(item, index) in banners" :key="index">
              <img :src="item.imageUrl" alt />
            </el-carousel-item>
          </el-carousel>
        
        </el-col>
      
      </el-row>
      <el-row class="hidden-sm-and-up">
  <el-col :span="24" >
          <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <img :src="item.imageUrl" alt />
    </el-carousel-item>
  </el-carousel> 
  </el-col>
    </el-row>
    </div>

    <!-- 推荐歌单 -->

    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt />
            <span class="iconfont el-icon-caret-right"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt />
            <span @click="playMusic(item.id)" class="iconfont el-icon-caret-right"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span class="iconfont el-icon-caret-right"></span>
            <div class="num-wrap">
              <div class="iconfont el-icon-caret-right"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  name: "discovery",
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: []
    };
  },
  created() {
    // console.log('created')
    // 轮播图接口
    axios({
      url: "https://autumnfish.cn/banner",
      method: "get"
    }).then(res => {
      // console.log(res)
      this.banners = res.data.banners;
    });

    // 推荐歌单
    axios({
      url: "https://autumnfish.cn/personalized",
      method: "get",
      params: {
        // 获取的数据量
        limit: 10
      }
    }).then(res => {
      // console.log(res)
      this.list = res.data.result;
    });

    // 最新音乐
    axios({
      url: "https://autumnfish.cn/personalized/newsong",
      method: "get"
    }).then(res => {
      // console.log(res)
      this.songs = res.data.result;
    });

    // 最新mv
    axios({
      url: "https://autumnfish.cn/personalized/mv",
      method: "get"
    }).then(res => {
      // console.log(res)
      this.mvs = res.data.result;
    });
  },
  methods: {
    playMusic(id) {
      // console.log(id)
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id // id:id
        }
      }).then(res => {
        // console.log(res)
        let url = res.data.data[0].url;
        // console.log(this.$parent.musicUrl)
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = url;
      });
    }
  }
};
</script>

<style>

/* iPhone 6/7/8/X */
/* 平板 */

@media screen and (min-width: 320px) and (max-width: 768px) {
  /* html {
    font-size: 26.67px;
  } */
  .discovery-container .recommend .items {
    width: 100% !important;
    justify-content: space-around !important;
    align-items: center !important;
    display: flex !important;
    flex-wrap: wrap;
    margin: 0 !important;
  }

  .discovery-container .recommend .items .item {
    width: 43% !important;
    margin: 10px;
  }

  .discovery-container .recommend .items .item img {
    width: 100%;
    border-radius: 5px;
  }

  .discovery-container .recommend .items .item .desc-wrap {
    position: absolute;
    width: 46%;
    top: 0;
    left: 0;
    font-size: 16px;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    max-height: 50px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    top: -50px;
  }

  .discovery-container .recommend .items .item .desc-wrap span {
    font-size: 14px;
  }

  .discovery-container .recommend .items .item:hover .desc-wrap {
    top: 0;
  }

  .discovery-container .recommend .items .item .img-wrap {
    position: relative;
  }

  .discovery-container .recommend .items .item .img-wrap .el-icon-caret-right {
    position: absolute;
    right: 10px;
    bottom: 13px;
    width: 40px;
    height: 40px;
    color: #dd6d60;
    font-size: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
  }

  .discovery-container
    .recommend
    .items
    .item
    .img-wrap
    .el-icon-caret-right::before {
    transform: translateX(0px);
  }

  .discovery-container
    .recommend
    .items
    .item
    .img-wrap:hover
    .el-icon-caret-right {
    opacity: 1;
  }

  .discovery-container .recommend .items .item .name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
  }

  .discovery-container .news {
    margin-bottom: 40px;
  }
  .discovery-container .news .items {
    width: 100% !important;
    margin: 0 auto !important;
    padding: 0px !important;
  }
  .discovery-container .mvs .items .item {
    cursor: pointer;

    width: 45% !important;
  }
}

.discovery-container .carousel {
  width: 100%;

  align-items: center;
  justify-content: space-around;
  overflow: hidden;
}

.discovery-container .el-carousel__container {
  height: 230px;
}

.discovery-container .el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.discovery-container .title {
  font-weight: normal;
  margin-bottom: 20px;
  padding-left: 50px;
}

.discovery-container .recommend {
  margin-bottom: 40px;
}

.discovery-container .recommend .items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
}

.discovery-container .recommend .items .item {
  width: 19%;
  position: relative;
  overflow: hidden;
}

.discovery-container .recommend .items .item img {
  width: 100%;
  height: 200px;
  border-radius: 5px;
}

.discovery-container .recommend .items .item .desc-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
}

.discovery-container .recommend .items .item .desc-wrap span {
  transition: 0.5s;
  font-size: 14px;
}

.discovery-container .recommend .items .item:hover .desc-wrap {
  top: 0;
}

.discovery-container .recommend .items .item .img-wrap {
  position: relative;
}

.discovery-container .recommend .items .item .img-wrap .el-icon-caret-right {
  transition: 0.5s;
  position: absolute;
  right: 10px;
  bottom: 13px;
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container
  .recommend
  .items
  .item
  .img-wrap
  .el-icon-caret-right::before {
  transform: translateX(0px);
}

.discovery-container
  .recommend
  .items
  .item
  .img-wrap:hover
  .el-icon-caret-right {
  opacity: 1;
}

.discovery-container .recommend .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}

.discovery-container .news {
  margin-bottom: 40px;
}

.discovery-container .news .items {
  height: 500px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
}

.discovery-container .news .items .item {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
}

.discovery-container .news .items .item:hover {
  transition: 0.5s;
  background-color: #f5f5f5;
}

.discovery-container .news .items .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.discovery-container .news .items .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.discovery-container .news .items .item .img-wrap img {
  width: 80px;
  height: 80px;
}

.discovery-container .news .items .item .img-wrap .iconfont {
  transition: 0.5s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #dd6d60;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container .news .items .item .img-wrap .iconfont::before {
  transform: translateX(0px);
  transition: 0.5s;
}

.discovery-container .news .items .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.discovery-container .news .items .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
  font-size: 16px;
}

.discovery-container .news .items .item .song-wrap .singer {
  font-size: 14px;
  color: gray;
}

.discovery-container .mvs .items {
  width: 100% !important;

  justify-content: space-around !important;

  display: flex !important;
  flex-wrap: wrap;
}

.discovery-container .mvs .items .item {
  cursor: pointer;

  width: 23%;

  position: relative;
  overflow: hidden;
}

.discovery-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.discovery-container .mvs .items .item .img-wrap > .el-icon-caret-right {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container
  .mvs
  .items
  .item
  .img-wrap
  > .el-icon-caret-right::before {
  transform: translateX(0px);
}

.discovery-container .mvs .items .item .img-wrap:hover > .el-icon-caret-right {
  opacity: 1;
}

.discovery-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.discovery-container .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.discovery-container
  .mvs
  .items
  .item
  .img-wrap
  .num-wrap
  .el-icon-caret-right {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.discovery-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
  margin-bottom: 5px;
}

.discovery-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
