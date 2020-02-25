<template>
  <li @click="setCurrentBookId(item._id), routerto(item._id)">
    <van-card
      :title="item.title"
      :thumb="decodeURIComponent(item.cover.split('').slice(7).join(''))"
    >
      <div slot="desc">
        <p>{{item.author}} | {{item.cat}}</p>
        <p>{{item.shortIntro}}</p>
        <p>
          <span
            style="color:red"
            v-if="item.latelyFollower > 10000"
          >{{(item.latelyFollower/10000).toFixed(1)+"万"}}</span>
          <span style="color:red" v-else>{{item.latelyFollower}}</span>
          <span>人气</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <span style="color:red">{{item.retentionRatio + "%"}}</span>
          <span>读者留存</span>
        </p>
      </div>
    </van-card>
  </li>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    setCurrentBookId(id) {
      this.$emit("translate-currentid", id);
    },
    routerto(ids) {
      this.$router.push({
        path: "/Player",
        query: {
          id: ids
        }
        
      });
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.van-card {
  padding: 8px 0;
}
.van-card__content {
  .van-card__title {
    color: #333;
    font-size: 14px;
    font-weight: 800;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
    font-size: 12px;
    margin: 8px 2px;
  }
}
</style>