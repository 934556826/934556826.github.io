<template>
  <div class="router">
    <div class="searching">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <van-icon slot="title">
          <h1>{{name}}</h1>
        </van-icon>

        <van-icon name="bar-chart-o" slot="right" />
        <van-icon name="user-circle-o" slot="right" />
      </van-nav-bar>
    </div>
    <ul>
      <h2 v-if="books">
        目录
        <span class="size">共{{books.length}}章</span>
        <span v-if="condition" class="right" @click="turnDown">倒序</span>
        <span v-else class="right" @click="turnUp">正序</span>
      </h2>
      <li
        v-for="(item, index) in books"
        :key="index"
        @click="reading(item.link,index)"
      >{{index + 1}}&nbsp;&nbsp;&nbsp;{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      books: null,
      name: null,
      condition: true,
      read: null
    };
  },
  methods: {
    turnDown() {
      this.condition = false;

      (this.books || []).reverse();
    },
    turnUp() {
      this.condition = true;
      (this.books || []).reverse();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    reading(link,count) {
      this.axios
        .get("http://novel.kele8.cn/chapters/" + encodeURIComponent(link))
        .then(response => {
          this.read = response.data.chapter;
          this.$router.push({
            path: "/read",
            query: {
              reading: this.read,
              bookId: this.$route.query.id,
              counts:count
            }
          });
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    Vue.axios
      .get("http://novel.kele8.cn/book-chapters/" + to.query.model)
      .then(function(response) {
        next(vm => {
          window.console.log("to ==> ", to);
          vm.books = response.data.chapters;
          vm.name = response.data.name;
        });
      });
  }
};
</script>

<style lang="less" scoped>
h2 {
  overflow: hidden;
  font-size: 14px;
  padding: 10px 20px;
  border-bottom: 1px solid #999;
  .size {
    color: #999;
    font-size: 12px;
  }
  .right {
    float: right;
  }
}
ul {
  & > li {
    color: #999;
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    border-bottom: 0.5px solid #999;
    margin-left: 20px;
  }
}
</style>