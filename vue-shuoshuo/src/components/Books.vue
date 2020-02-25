<template>
  <van-card
      :title="item.title"
      :thumb="decodeURIComponent(item.cover.split('').slice(7).join(''))"
    >
      <div slot="desc">
        <p
          v-if="item.wordCount > 10000"
        >{{item.author}} | {{item.cat}} | {{Math.round(item.wordCount/1000)}}</p>
        <p v-else>{{item.author}} | {{item.cat}} | {{item.wordCount}}</p>
        <p>1小时前更新</p>
      </div>
    </van-card>
</template>

<script>
export default {
    props:["item"]

}
</script>

<style>

</style>