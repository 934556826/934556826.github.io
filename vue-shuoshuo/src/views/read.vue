<template>
  <div class="read"  >
    <div class="reading" v-for="(item, index) in content" @click.stop="showPopup" :key="index">
      <h1>{{item.title}}</h1>
      <div class="pp"  >
        <!-- <p v-for="(item, index) in cp" :key="index">&nbsp;&nbsp;&nbsp;{{item}}</p> -->
        <p v-for="(m, index) in item.cpContent" :key="index">&nbsp;&nbsp;&nbsp;{{m}}</p>
      </div>

      <!-- 触底子组件 -->
      <!-- <div class="scroll"></div> -->
      <!-- <Scroll :onBottom="onBottom"></Scroll> -->
    </div>

<van-popup
  v-model="show"
  position="top"
  :style="{ height: '7%' }"
>
<div >我是内容</div>

</van-popup>
   
  <van-popup
  v-model="show"
  position="bottom"
  closeable
  close-icon="close"
  :style="{ height: '30%' }"
>
<div class="content">我是内容</div>

</van-popup>
  </div>
</template>

<script>
// import Scroll from '../components/Scroll'
export default {
  name: "roll",
  // components:{
  //   Scroll
  // },
  data() {
    return {
      content: [],
      Bokk: null,
      viewone: null,
      readone: null,
      show: false
    };
  },

  methods: {
    showPopup() {
      this.show = true;
      setTimeout(function(){
        document.getElementsByClassName('van-popup--top')[0].style.zIndex = 
      document.getElementsByClassName('van-overlay')[0].style.zIndex + 1;
      },0)
      
      // window.console.log("????")
    },

    deee() {
      var self = this;

      var timer = setTimeout(function() {
        for (var i = 1; i < self.$store.state.timers.length; i++) {
          clearTimeout(self.$store.state.timers[i]);
        }

        //清除保存定时器序号的数组
        self.$store.state.timers = [];

        //获取页面可视高度
        var iw = innerHeight;
        // console.log('iw ==> ', iw);

        //获取滚动距离
        var scrollY = pageYOffset;
        // console.log('scrollY ==> ', scrollY);

        //获取商品最后一个节点
        var last = document.querySelectorAll("p:last-child")[
          document.querySelectorAll("p:last-child").length - 1
        ];
        // console.log('last ==> ', last);

        //获取商品最后一个节点的高度
        var height = parseFloat(getComputedStyle(last).height);
        // console.log('height ==> ', height);

        //获取商品最后一个节点距离页面顶部的距离
        var offsetTop = last.offsetTop;
        // console.log('offsetTop ==> ', offsetTop);

        //距离最后一个商品节点100px左右，触发加载数据
        if (iw + scrollY - height + 30 >= offsetTop) {
          self.onBottom();
        }
      }, 500);

      self.$store.state.timers.push(timer);
    },

    // 防抖
    debounce(fn, wait) {
      var timeout = null;
      return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      };
    },
    listenNode(){
      window.console.log("关闭了吗");
      
    },

    // 处理函数
    onBottom() {
      window.console.log("触底啦！！！");

      // this.$store.commit("countadd");

      // this.axios
      //   .get(
      //     "http://novel.kele8.cn/book-sources?view=summary&book=" +
      //       this.$route.query.bookId
      //   )
      //   .then(response => {
      //     window.console.log(response.data[0]._id);
      //     this.Bokk = response.data[0]._id;

      //     this.axios
      //       .get("http://novel.kele8.cn/book-chapters/" + this.Bokk)
      //       .then(response => {
      //         window.console.log("111", this.$store.state.count);
      //         if (this.$store.state.count == undefined) {
      //           this.viewone = response.data.chapters[0];
      //         } else {
      //           this.viewone = response.data.chapters[this.$store.state.count];
      //         }

      //         // window.console.log("data => ",response.data.chapters[0])
      //         this.axios
      //           .get(
      //             "http://novel.kele8.cn/chapters/" +
      //               encodeURIComponent(this.viewone.link)
      //           )
      //           .then(response => {
      //             this.readone = response.data.chapter;
      //             this.readone.cpContent = this.readone.cpContent.split("\n");
      //             this.content.push(this.readone);
      //           });
      //       });
      //   });
    }
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.deee);
  },
 
  destroyed() {
    window.removeEventListener("scroll", this.deee);
    
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.path = to.query.reading.title;
      // vm.cp = to.query.reading.cpContent.split("\n");
      // vm.content = to.query.reading;
      // window.console.log(vm.content)

      //每次进入 清空content
      vm.content = [];
      // 章节数清零
      // vm.$store.commit("resizecount");
      //  获取章节
      vm.$store.commit("recount", to.query.counts);

      to.query.reading.cpContent = to.query.reading.cpContent.split("\n");
      vm.content.push(to.query.reading);
    });
  }
};
</script>

<style lang="less" scoped>

.content {
  padding: 16px 16px 160px;
}
.read {
  color: #5c5d58;
  background: #eee6dd;
  line-height: 1.5;
  h1 {
    padding: 22px 17px;
    padding-bottom: 0;
    font-size: 22px;
    font-weight: 400;
    color: #333;
  }
  .pp {
    padding: 8.5px 17px;
    & > p {
      text-indent: 2em;
      font-size: 18px;
      margin: 5px 0;
    }
  }
}
</style>