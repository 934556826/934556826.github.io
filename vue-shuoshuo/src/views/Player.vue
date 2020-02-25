<template>
  <div class="player">
    <!-- <Books
    v-for="(item, index) in BookDetails" :key="index"
    :item="item"
    />-->

    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <van-icon slot="title">
        <h1>书籍详情</h1>
      </van-icon>

      <van-icon name="bar-chart-o" slot="right" />
      <van-icon name="user-circle-o" slot="right" />
    </van-nav-bar>

    <van-card
      :title="BookDetails.title"
      :thumb="decodeURIComponent((BookDetails.cover || '').split('').slice(7).join(''))"
    >
      <div slot="desc">
        <p
          v-if="BookDetails.wordCount > 10000"
        >{{BookDetails.author}} | {{BookDetails.cat}} | {{Math.round(BookDetails.wordCount/10000)}}万字</p>
        <p v-else>{{BookDetails.author}} | {{BookDetails.cat}} | {{BookDetails.wordCount}}字</p>
        <p>1小时前更新</p>
      </div>
    </van-card>

    <div class="butto">
      <van-button plain type="primary">加入书架</van-button>
      <van-button plain type="info" @click="rounterToView">开始阅读</van-button>
    </div>

    <div class="mess">
      <van-row gutter="20">
        <van-col span="8">
          <h5>追人气</h5>
          <span
            v-if="BookDetails.latelyFollower > 10000"
          >{{(BookDetails.latelyFollower/10000).toFixed(1)+"万"}}</span>
          <span v-else>{{BookDetails.latelyFollower}}</span>
        </van-col>
        <van-col span="8">
          <h5>读者留存</h5>
          <span>{{BookDetails.retentionRatio + "%"}}</span>
        </van-col>
        <van-col span="8">
          <h5>日更字数/天</h5>
          <span>{{BookDetails.serializeWordCount}}</span>
        </van-col>
      </van-row>
    </div>

    <div class="reduce">
      <p>{{BookDetails.longIntro}}</p>
      <van-icon @click="toggleClassTest()" name="arrow-down" />
    </div>

    <div class="root" @click="runto">
      <p class="left">目录</p>
      <p class="right">[1小时前更新] {{BookDetails.lastChapter}}</p>
      <van-icon name="arrow" />
    </div>

    <div class="hotreduce">
      <p>热门书评</p>
      <!-- <van-skeleton title avatar :row="3" /> -->
      <div v-if="BookReviews">
        <van-card
          v-for="(item, index) in BookReviews"
          :key="index"
          :title="item.author.nickname"
          thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578737359514&di=4ce796b6039eda66cbb7b931ee302ed9&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F16%2F20161016003847_PzsfA.jpeg"
        >
          <div slot="desc">
            <p class="title">{{item.title}}</p>
            <div>
              <p v-if="item.rating == 5">
                <i class="star"></i>
                <i class="star"></i>
                <i class="star"></i>
                <i class="star"></i>
                <i class="star"></i>
              </p>
              <p v-else-if="item.rating == 4">
                <i class="star"></i>
                <i class="star"></i>
                <i class="star"></i>
                <i class="star"></i>
                <i class="star-none"></i>
              </p>
              <p v-else>
                <i class="star"></i>
                <i class="star"></i>
                <i class="star"></i>
                <i class="star-none"></i>
                <i class="star-none"></i>
              </p>
            </div>
            <p class="shot">{{item.content}}</p>
            <div class="useful">
              <span class="left">7小时前</span>
              <span class="right">{{item.helpful.yes}}人觉得有用</span>
            </div>
          </div>
        </van-card>
      </div>
    </div>
    <div v-if="!BookReviews[0]">暂无评论~</div>
  </div>
</template>



<script>
// import Books from "../components/Books.vue";
import Vue from "vue";
export default {
  // components:{
  //     Books,
  // },
  // props:["currentBookId"]
  data() {
    return {
      BookDetails: [],
      BookReviews: {},
      Bookmodel: null,
      Bokk: null,
      viewone: null,
      readone: null
    };
  },

  methods: {
    rounterToView() {
      this.axios
        .get(
          "http://novel.kele8.cn/book-sources?view=summary&book=" +
            this.$route.query.id
        )
        .then(response => {
          window.console.log(response.data[0]._id);
          this.Bokk = response.data[0]._id;

          this.axios
            .get("http://novel.kele8.cn/book-chapters/" + this.Bokk)
            .then(response => {
              window.console.log("111");
              this.viewone = response.data.chapters[0];
              
              // window.console.log("data => ",response.data.chapters[0])
              this.axios
                .get(
                  "http://novel.kele8.cn/chapters/" +
                    encodeURIComponent(this.viewone.link)
                )
                .then(response => {
                  this.readone = response.data.chapter;
                  this.$router.push({
                    path: "/read",
                    query: {
                      reading: this.readone,
                      bookId: this.$route.query.id,
                      counts:0
                    }
                  });
                });
            });
        });

      // .then(

      //     // .then(
      //     //   this.axios
      //     //     .get(
      //     //       "http://novel.kele8.cn/chapters/" +
      //     //         encodeURIComponent(this.viewone.link)
      //     //     )
      //     //     .then(response => {
      //     //       this.readone = response.data.chapter;
      //     //       // this.$router.push({
      //     //       //   path: "/read",
      //     //       //   query: {
      //     //       //     reading: this.readone
      //     //       //   }
      //     //       // });
      //     //     })
      //     // )
      // );
    },
    // getReviews() {
    //   this.axios
    //     .get("http://novel.kele8.cn/book/reviews", {
    //       params: {
    //         book: this.$route.query.id
    //       }
    //     })
    //     .then(response => {
    //       this.BookReviews = response.data.reviews.slice(0, 2);
    //     });
    // },
    runto() {
      this.axios
        .get(
          "http://novel.kele8.cn/book-sources?view=summary&book=" +
            this.$route.query.id
        )
        .then(response => {
          this.Bookmodel = response.data[0]._id;
          //跳转路由
          this.$router.push({
            path: "/routerr",
            query: {
              model: this.Bookmodel,
              id: this.$route.query.id,
              
            }
          });
        });
    },

    getBookfool() {
      this.axios
        .get("http://novel.kele8.cn/book/reviews?book=" + this.$route.query.id)
        .then(response => {
          this.BookReviews = response.data;
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getBookDetails() {
      this.axios
        .get("http://novel.kele8.cn/book-info/" + this.$route.query.id)
        .then(response => {
          this.BookDetails = response.data;
        });
    },
    hasClass: function(obj, cls) {
      return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    },

    addClass: function(obj, cls) {
      if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },

    removeClass: function(obj, cls) {
      if (this.hasClass(obj, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, " ");
      }
    },

    toggleClass: function(obj, cls) {
      if (this.hasClass(obj, cls)) {
        this.removeClass(obj, cls);
      } else {
        this.addClass(obj, cls);
      }
    },
    toggleClassTest: function() {
      var obj = document.querySelector(".reduce>p");
      var obj1 = document.querySelector(".reduce>.van-icon");
      this.toggleClass(obj, "active1");
      this.toggleClass(obj1, "active");
    }
  },
  created() {
    this.getBookDetails();
    // this.getBookfool();
    // this.getReviews();
  },
  updated() {
    this.getBookDetails();
    // this.getBookfool();
    // this.getReviews();
  },
  // beforeRouteEnter(to, from, next) {
  //   Vue.axios
  //     .get("http://novel.kele8.cn/book-sources?view=summary&book=", {
  //       params: {
  //         book: to.query.id
  //       }
  //     })
  //     .then(function(response) {
  //       next(vm => {
  //         // vm.BookReviews = response.data.reviews.slice(0, 2);
  //         vm.Bokk = response.data[0]._id;
  //       });
  //     });
  // }
  beforeRouteEnter(to, from, next) {
    Vue.axios
      .get("http://novel.kele8.cn/book/reviews", {
        params: {
          book: to.query.id
        }
      })
      .then(function(response) {
        next(vm => {
          vm.BookReviews = response.data.reviews.slice(0, 2);
          // vm.Bokk = response.data[0]._id;
        });
      });
  }
};
</script>

<style lang="less">
.hotreduce {
  .van-card__thumb {
    width: 30px;
    height: 30px;
  }
  .van-image {
    border-radius: 50%;
    overflow: hidden;
  }
  .van-card .van-card__content .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .van-card__content .van-card__title {
    color: #a58d5e;
    font-size: 12px;
    height: 12.8px;
    line-height: 12.8px;
  }
  .van-card .van-card__content p {
    margin: 2px;
  }
  .useful {
    overflow: hidden;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
  .star {
    width: 10.5px;
    height: 10.5px;
    display: inline-block;
    background: url(/images/start.png) 50% no-repeat;
    background-size: 80%;
    background-position: 0;
  }
  .star-none {
    width: 10.5px;
    height: 10.5px;
    display: inline-block;
    background: url(/images/starto.png) 50% no-repeat;
    background-size: 80%;
    background-position: 0;
  }
}
.root {
  .van-icon {
    position: absolute;
    bottom: 20px;
    right: 5px;
    color: #999;
  }
  padding: 17px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #ebebeb;
  .left {
    float: left;
  }
  .right {
    color: #999;
    font-size: 12px;
    float: right;
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.mess {
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 17px;
  text-align: center;
  h5 {
    margin-bottom: 5px;
  }
}
.reduce {
  position: relative;
  border-bottom: 1px solid #ebebeb;
  padding: 17px;
  .active {
    transform: rotate(-180deg);
  }
  .van-icon {
    position: absolute;
    bottom: 0;
    right: 5px;
    transition: all 0.3s;
  }
  .active1 {
    display: block;
  }
  p {
    font-size: 13px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
.butto {
  display: flex;
  padding: 17px;
  .van-button {
    flex: 1;
    &:first-child {
      margin-right: 15px;
      border: 1px solid #b93321;
      color: #b93321;
    }
    &:last-child {
      margin-left: 15px;
      background-color: #b93321;
      border: 1px solid #b93321;
      color: #fff;
    }
  }
}
.player {
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