<template>
  <div class="top-container">
    <el-row :gutter="10">
      <el-col :xs="14" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="left-box">
          <div class="icon-wrapper">
            <span class="iconfont icon-home hidden-xs-only"></span>
            <span class="iconfont icon-sami-select hidden-xs-only"></span>
            <span class="iconfont icon-full-screen hidden-xs-only"></span>
            <icon
              class="iconfont iconfont-news hidden-sm-and-up"
              @click="drawer = true"
              type="primary"
            >&#xe605;</icon>
          </div>
        </div>
      </el-col>
      <!-- 导航区域 -->

      <el-col class="hidden-xs-only" :sm="15" :md="16" :lg="16" :xl="16">
        <div class="nav">
          <ul>
            <el-col :sm="6">
              <li>
                <router-link to="/discovery">
                  <span class="iconfont icon-find-music"></span>
                  发现音乐
                </router-link>
              </li>
            </el-col>
            <el-col :sm="6">
              <li>
                <router-link to="/playlists">
                  <span class="iconfont icon-music-list"></span>
                  推荐歌单
                </router-link>
              </li>
            </el-col>
            <el-col :sm="6">
              <li>
                <router-link to="/songs">
                  <span class="iconfont icon-music"></span>
                  最新音乐
                </router-link>
              </li>
            </el-col>
            <el-col :sm="6">
              <li>
                <router-link to="/mvs">
                  <span class="iconfont icon-mv"></span>
                  最新MV
                </router-link>
              </li>
            </el-col>
          </ul>
        </div>
      </el-col>
      <!-- 搜索 -->
      <el-col :xs="10" :sm="5" :md="4" :lg="4" :xl="4">
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
      </el-col>

      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        size="36%"
        style="transition:none;"
      >
        <div class="nav">
          <ul>
            <li>
              <router-link to="/discovery">
                <span class="iconfont icon-find-music"></span>
                发现音乐
              </router-link>
            </li>

            <li>
              <router-link to="/playlists">
                <span class="iconfont icon-music-list"></span>
                推荐歌单
              </router-link>
            </li>

            <li>
              <router-link to="/songs">
                <span class="iconfont icon-music"></span>
                最新音乐
              </router-link>
            </li>

            <li>
              <router-link to="/mvs">
                <span class="iconfont icon-mv"></span>
                最新MV
              </router-link>
            </li>
          </ul>
        </div>
      </el-drawer>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      inputValue: "",
      drawer: false
    };
  },
  methods: {
    toResult() {
      if (this.inputValue == "") {
        this.$message.warning("请输入内容");
      } else {
        this.$router.push("/result?q=" + this.inputValue);
      }
    }
  }
};
</script>

<style>
@media screen and (min-width: 320px) and (max-width: 768px) {
  .top-container .nav {
    text-align: center;
  }
  .top-container .nav li {
    float:none !important;
    text-align: center !important;
  }
}
#app .index-container {
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
}
.top-container .left-box {
  line-height: 60px;
  display: inline-block;
}

.top-container .left-box .icon-wrapper {
  margin-left: 5px;
}

.top-container .left-box .icon-wrapper .iconfont {
  margin-right: 10px;
  font-size: 12px;
  width: 18px;
  height: 18px;
  display: inline-block;
  text-align: center;
  line-height: 18px;
}

.top-container .nav {
  background-color: #ededed;
  height: 100%;
}

.top-container .nav li {
  height: 60px;
  cursor: pointer;
  float: left;
  align-items: center;
  text-align: center;
}

.top-container .nav li:hover {
  background-color: #e7e7e7;
}

.top-container .nav li .iconfont {
  font-size: 20px;
}

.top-container .nav li a {
  color: black;
  padding: 0 30px;
  font-size: 18px;
  line-height: 60px;
  width: 100%;
  height: 100%;
}
.top-container .nav li a.router-link-active {
  color: #dd6d60;
}

.top-container .nav li a.router-link-active .iconfont {
  color: #dd6d60;
}

.top-container .left-box .icon-wrapper .iconfont::before {
  opacity: 0;
  transition: 0.2s;
}

.top-container .left-box .icon-wrapper .iconfont:hover::before {
  opacity: 1;
}

.top-container .left-box .icon-wrapper .iconfont.icon-home {
  background-color: #dd6d60;
  border-radius: 50%;
}

.top-container .left-box .icon-wrapper .iconfont.icon-sami-select {
  background-color: #dcc060;
  border-radius: 50%;
}

.top-container .left-box .icon-wrapper .iconfont.icon-full-screen {
  background-color: #84bb58;
  border-radius: 50%;
}

.top-container .left-box .history-wrapper {
  align-items: center;
}

.top-container .left-box .history-wrapper .iconfont {
  width: 35px;
  height: 35px;
  font-size: 30px;
  text-align: center;
  line-height: 35px;
  color: gray;
  border-radius: 50%;
  transition: 0.2s;
  cursor: pointer;
}

.top-container .left-box .history-wrapper .iconfont:first-child {
  margin-right: 10px;
}

.top-container .left-box .history-wrapper .iconfont:hover {
  background-color: #ebebeb;
}

.top-container .right-box {
  line-height: 60px;
  float: right;
  align-items: center;
}
.el-drawer {
  transition: none !important;
}
.el-row {
  margin: 0 !important;
}
</style>
