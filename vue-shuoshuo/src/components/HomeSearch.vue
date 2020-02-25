<template>
  <div class="home-search">
    <van-search
      v-model="value"
      left-icon
      :clearable="false"
      @focus="$router.push('/search/searching')"
    >
      <van-icon name="search" slot="right-icon" @click="getCurrentSearchKeyword"/>
    </van-search>

    <van-swipe
      vertical
      :show-indicators="false"
      :touchable="false"
      :autoplay="3000"
      @change="getCurrentSearchIndex"
    >
      <van-swipe-item v-for="(item, index) in hotWords" :key="index">{{item}}</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      hotWords: [
        "超级女婿",
        "后娘[穿越]",
        "赘婿当道",
        "财阀小娇妻：谢少宠上瘾！",
        "入骨宠婚：误惹天价老公",
        "兽黑狂妃：皇叔逆天宠",
        "最强屠龙系统",
        "女神的超级赘婿",
        "剑起风云",
        "后娘最彪悍",
        "太古狂魔",
        "第一赘婿",
        "重生民国娇小姐",
        "秦夫人",
        "武将宠妻手簿",
        "御天武帝",
        "娱乐春秋",
        "阴间神探",
        "第一狂妃",
        "我在修真界当宗主",
        "本座花无缺"
      ],
      index: 0
    };
  },
  methods: {
    getCurrentSearchIndex(index) {
      this.index = index;
    },
    getCurrentSearchKeyword() {
      this.$store.commit("setCurrentSearchKeyword", {
        value: this.hotWords[this.index]
      });
      this.$router.push({
        path: "/search",
        query: { keyword: this.hotWords[this.index] }
      });
    }
  }
};
</script>

<style lang="less">
.home-search {
  position: relative;
  .van-swipe {
    width: 50%;
    height: 34px;
    position: absolute;
    top: 10px;
    left: 20px;
    .van-swipe-item {
      line-height: 34px;
      font-size: 12px;
    }
  }
}
</style>