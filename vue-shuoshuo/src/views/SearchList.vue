<template>
  <div class="searchlist">
    <div class="searching">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <van-icon slot="title">
          <h1>跟“{{this.$store.state.currentSearchKeyword}}”有关的书籍</h1>
        </van-icon>

        <van-icon name="bar-chart-o" slot="right" />
        <van-icon name="user-circle-o" slot="right" />
      </van-nav-bar>
    </div>
    <!-- <h4 v-for="(item, index) in books" :key="index">{{item.title}}</h4> -->

    <ul class="book">
      <Book v-for="(item, index) in books" :key="index" :item="item"
      
      ></Book>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import Book from "../components/Book.vue";
export default {
  components: {
    Book
  },
  data() {
    return {
      books: [],
      str: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    get() {
      this.str = "与" + this.$store.state.currentSearchKeyword + "有关的书籍";
    }
    // decodeURIComponent
    // DecodeURI() {
    //   if(this.books.length > 1){
    //     for (var i = 0; i < this.books.length; i++) {
    //     this.books[i].cover = decodeURIComponent(this.books[i].cover.split('').slice(7).join(''))
    //   }
    //   }else{
    //     return 0;
    //   }

    // }
  },
  beforeRouteEnter(to, from, next) {
    Vue.axios
      .get("http://novel.kele8.cn/search", {
        params: {
          keyword: to.query.keyword
        }
      })
      .then(function(response) {
        
        next(vm => {
          window.console.log("to ==> ",to);
          window.console.log("from ==> ",from);
          vm.books = response.data.books;
        });
      });
  },

  created() {
    this.get();
  }
  // mounted() {
  //   this.DecodeURI();
  // },
};
</script>

<style lang="less">
.searching {
  .van-nav-bar__left {
    left: 5px;
  }
  .van-nav-bar {
    background-color: #b93321;
    .van-icon-undefined {
      width: 100%;
      h1 {
        font-size: 14px;
        height: 46px;
        line-height: 40px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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