<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url" autoplay></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="mvInfo.cover" alt />
          </div>
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布：2014-11-04</span>
          <span class="number">播放：{{mvInfo.playCount}}</span>
          <p class="desc">{{mvInfo.desc}}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论
          <span class="number">(666)</span>
        </p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论
          <span class="number">(666)</span>
        </p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      ></el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in simiMvs" :key="index">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      url: "",

      simiMvs: [],
      mvInfo: {},
      icon: ""
    };
  },
  created() {
    axios({
      method: "get",
      url: "https://autumnfish.cn/mv/url",
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      this.url = res.data.data.url;
    });
    //获取相关mv
    axios({
      method: "get",
      url: "https://autumnfish.cn/simi/mv",
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      this.simiMvs = res.data.mvs;
    });
    //获取mv信息
    axios({
      method: "get",
      url: "https://autumnfish.cn/mv/detail",
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      //console.log(res)
      this.mvInfo = res.data.data;
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped></style>
