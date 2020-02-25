<template>
  <div class="searching">
    <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="onClickLeft">
      <van-icon name="bar-chart-o" slot="right" />
      <van-icon name="user-circle-o" slot="right" />
    </van-nav-bar>

    <van-search v-model="value" placeholder="请输入搜索关键词" 
    show-action 
    shape="round"
    @input="wordreflex(value)"
    
    >
      <div slot="action" @click="getCurrentSearchtwo(value)">确定</div>
    </van-search>

    <div v-if="!value" class="hot">
      <h3>
        热门推荐
        <span @click="reverseHotWords()">
          换一批
          <van-icon name="replay" />
        </span>
      </h3>
      <ul class="res">
        <li v-for="(item, index) in hotwords" :key="index" @click="getCurrentSearch(index)">{{item}}</li>
      </ul>
    </div>

    <!-- 补全搜索词 -->
    <ul v-if="value" class="ser">
      <li v-for="(item, index) in searchList" :key="index"
      @click="getCurrentSearchtwo(item)"
      >
        <van-icon name="label-o" />
        {{item}}
        </li>
    </ul>
  <Loading v-if="loading"/>

  </div>
</template>

<script>
import Loading from "../components/Loading.vue"
export default {
  components: {
    Loading
  },
  data() {
    return {
      value: "",
      hotwords: [],
      searchList:[],
      loading:false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getCurrentSearchtwo(item){
      window.console.log(item);
      this.$store.commit("setCurrentSearchKeyword", {
        value: item
      });

      //跳转路由
      this.$router.push({
        path: "/search",
        query: { keyword: item }
      });
    },
    wordreflex(value){
      this.loading = true;
      this.axios.get("http://novel.kele8.cn/auto-complete",{
        params:{
          query:value
        }
      }).then(response => {
        this.searchList = response.data.keywords;
      }).finally(() => {
          this.loading = false;
        });
    },
    getSearchHot() {
      this.loading = true;
      this.axios.get("http://novel.kele8.cn/hot-books").then(response => {
        this.hotwords = response.data.hotWords.slice(0, 6);
        // window.console.log(response);
      }).finally(() => {
          this.loading = false;
        });
    },
    getCurrentSearch(index) {
      this.$store.commit("setCurrentSearchKeyword", {
        value: this.hotwords[index]
      });

      //跳转路由
      this.$router.push({
        path: "/search",
        query: { keyword: this.hotwords[index] }
      });
    },
    reverseHotWords() {
      this.loading = true;
      this.$store.commit("numcount",1);
      if(this.$store.state.num >= 5){
        this.$store.commit("resizenum");
      }
      this.axios.get("http://novel.kele8.cn/hot-books").then(response => {
        this.hotwords = response.data.hotWords.slice(
          this.hotwords.length * this.$store.state.num,
          this.hotwords.length * this.$store.state.num + 6
        );
        // window.console.log(response);
      }).finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.getSearchHot();
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
.ser{
  li{
    line-height: 45px;
    height: 45px;
    padding: 0 10px;
    .van-icon{
      vertical-align: middle;
    }
  }
}
.hot {
  padding: 8px;
  h3 {
    margin-bottom: 8px;
    position: relative;
    span {
      position: absolute;
      right: 0;
      top: 5px;
      font-size: 12px;
      color: #9b9ba3;
    }
  }
}
.res {
  overflow: hidden;

  li {
    float: left;
    font-size: 12px;
    color: #9b9ba3;
    background: #efeff4;
    // border:1px solid #efeff4;
    border-radius: 15px;
    padding: 4px 8px;
    margin: 0 9px 9px 0;
  }
}
.searching {
  .van-nav-bar {
    background-color: #b93321;
    .van-icon-undefined {
      width: 100%;
    }
    .van-nav-bar__title {
      color: #fff;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 600;
    }
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>