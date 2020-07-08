<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{$route.query.q}}</h2>
      <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in songList"
              :key="index"
              class="el-table__row"
              @dblclick="playMusic(item.id)"
            >
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span v-if="item.mvid !=0" class="iconfont el-icon-video-play"></span>
                  </div>
                  <span v-if="item.alias.length!=0">{{item.alias[0]}}</span>
                </div>
              </td>
              <td>{{item.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            class="item"
            v-for="(item,index) in playlists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont el-icon-caret-right"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div v-for="(item,index) in mv" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont el-icon-caret-right"></span>
              <div class="num-wrap">
                <div class="iconfont el-icon-caret-right"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "result",
  data() {
    return {
      activeIndex: "songs",
      songList: [],
      playlists: [],
      count: [],
      mv: []
    };
  },
  methods: {
    toMV(id) {
      this.$router.push(`/mv?q=${id}`);
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`);
    },
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
  },
  created() {
    axios({
      url: "https://autumnfish.cn/search",
      method: "get",
      params: {
        keywords: this.$route.query.q,
        type: 1,
        limit: 10
      }
    }).then(res => {
      //  console.log(res);
      this.songList = res.data.result.songs;

      for (let i = 0; i < this.songList.length; i++) {
        let min = parseInt(this.songList[i].duration / 1000 / 60);
        let sec = parseInt((this.songList[i].duration / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.songList[i].duration = min + ":" + sec;
      }

      this.count = res.data.result.songCount;
    });
  },
  watch: {
    activeIndex() {
      let type = 1;
      let limit = 10;
      switch (this.activeIndex) {
        case "songs":
          type = 1;
          break;
        case "lists":
          type = 1000;
          break;
        case "mv":
          type = 1004;
          limit = 8;
          break;
        default:
          break;
      }
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.q,
          type,
          limit
        }
      }).then(res => {
        // console.log(res);
        if (type == 1) {
          this.songList = res.data.result.songs;
          for (let i = 0; i < this.songList.length; i++) {
            let min = parseInt(this.songList[i].duration / 1000 / 60);
            let sec = parseInt((this.songList[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.songList[i].duration = min + ":" + sec;
          }

          this.count = res.data.result.songCount;
        } else if (type == 1000) {
          this.playlists = res.data.result.playlists;
          this.count = res.data.result.playlistCount;

          for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].playCount > 100000) {
              this.playlists[i].playCount =
                parseInt(this.playlists[i].playCount / 10000) + "万";
            }
          }
        } else {
          this.mv = res.data.result.mvs;
          this.count = res.data.result.mvCount;
          for (let i = 0; i < this.mv.length; i++) {
            let min = parseInt(this.mv[i].duration / 1000 / 60);
            let sec = parseInt((this.mv[i].duration / 1000) % 60);
            if (min < 10) {
              min = "0" + min;
            }
            if (sec < 10) {
              sec = "0" + sec;
            }
            this.mv[i].duration = min + ":" + sec;

            if (this.mv[i].playCount > 100000) {
              this.mv[i].playCount =
                parseInt(this.mv[i].playCount / 10000) + "万";
            }
          }
        }
      });
    }
  }
};
</script>

<style>

.result-container .title-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}

.result-container .title-wrap .title {
  margin-right: 10px;
}

.result-container .title-wrap .sub-title {
  font-size: 15px;
  color: #bebebe;
}

.result-container .el-tabs__item {
  font-size: 18px;
}

.result-container .el-table td,
.result-container .el-table th.is-leaf {
  border-bottom: none;
}

.result-container .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.result-container .items .item {
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}

.result-container .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.result-container .items .item .img-wrap > .el-icon-caret-right {
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

.result-container .items .item .img-wrap > .el-icon-caret-right::before {
  transform: translateX(0px);
}

.result-container .items .item .img-wrap:hover > .el-icon-caret-right {
  opacity: 1;
}

.result-container .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.result-container .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.result-container .items .item .img-wrap .num-wrap .el-icon-caret-right {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 0px;
}

.result-container .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.result-container .items .item .name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.result-container .items .item .singer {
  font-size: 14px;
  color: #c5c5c5;
}

.result-container .items.mv .item {
  width: 250px;
}

</style>
