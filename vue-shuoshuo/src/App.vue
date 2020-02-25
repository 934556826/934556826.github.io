<template>
  <div id="app">
    
      <router-view/>
   
  </div>
</template>
<script>
// import Player from "@/views/Player.vue";
export default {
  components:{
    // Player
  },
  data() {
    return {
      value: "",
      currentSongId:null
    };
  }
};
</script>

<style lang="less">
</style>
