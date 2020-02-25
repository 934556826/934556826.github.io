<template>
  <div class="home-nav">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <van-image
        width="75"
        height="18"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAABIBAMAAACU8SQRAAAALVBMVEVHcEz////////////////////////////////////////////////////////NXt0CAAAADnRSTlMA4fGcFXjOJ7Q7WmlLh+5Ft9UAAAOBSURBVGje5ZpNaxNBGMfHJmnaWEPxIl5CDl68hIIHPZUIS/VUetBrqSAeQw5CPYUcRDwF8SaI5Oyh5C7I4lmkX0AwSV82L93PYLKZzO48u7M7MztP3OJz6TJMpj/+O/O8zRKytIYbtiPC2Q06PCYkx0+8IPH2fT6pTfStE0HXzgydGe344a6Ybs2bMFqnM89Jwfs73KID/WtAt3humnqzaekcAV22tUOh241Y1K0G6AjZ4OkI2bx+dBIWoBNZWjon03S42gH7T+iiTsXCtldI5+jTPaYDE2thT44DhqtdJ46u7CZZX3wqTn1v3EJ5s8l0Tqbpzs3QOTh0UxTtQAbV48a+yNOdZZqummm6Nsq+M0V3mmntuuHFbOqNY+gCR74Q6T8N0TVR6IBHEdCJ4ixbckAQ6eqadBuCghaJTjFHWRYt892sRidn6ejYfpxg0hFNutZyzkgxc19LPGaD9HQnyzl/EOnmTxUdukNYW2aKrgN7Grh0PbWqh22HA0S6vi4dW8vOIF2RrVVXrbb95o9nL2M8yoUmXSkUs5XobsGqRJMuOQugiEHXbsdVjHwz2Mu/8r5T65mnG9LlmpJ0ey6INDkXBkYmbCVd1UPLsijtBJGsyP7jwIbu031rnG4q0E5A95H98C7bxzWW89RN010qaRci4Ynv+3RDI3RVJe1Cb9F72+xgDLqG6Y5UtAufAM+e8s0FNqGWmm5HQbu8700eWpYV1bXaCdM981pfGlUP9Uay2u25CZn7Yjt6D1eMTrsmm9kHee02K8l07h1ZOmHvM7hmXV67H64E3cwNsh2oR5cDVZScdjddGbpZCElJtw76i9Jndl++uzjRpgvkaVdExd+1VkHX8unGJrRzjNL94gMZinbjJG8spPPj0aJolM7v9ldBtwsuJKXzOwW6qTZdgw9kqbVzjNIFfnWApd0oVK9I0hUD02ysfadNtwUCGYp2c2fg38e9tgIWX20XotqBpvfdpVw3LUyXgxdl0tqV1bTTolsHgUxeOwW6M126MghkKNrJ3TLF9T6X3U+gnfhrmbLCHaMu3QkIZFA7ZTqj2h2CQJZaO6N0HXiNh6FdX5euAQIZvBFI+kpL6jblXkeTDgYyFLrtUk2Lrii6xjNLR95o0ZVAmxeLjnz++u357weP3r96cbsm/2ZjPyK103+Vyt2FUMtbx59+Utp3M9p/RvcXlN2FjxlfktkAAAAASUVORK5CYII="
        slot="left"
      />

      <div class="button-group" slot="title">
        <button @click="male()" :class="{'active':active}">男生</button>
        <button @click="female()" :class="{'active':nactive}">女生</button>
      </div>

      <van-icon name="bar-chart-o" slot="right" />
      <van-icon name="user-circle-o" slot="right" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: ["active","nactive"],
  data() {
    return {
      istrue: true
    };
  },
  methods: {
    male() {
      this.$router.push({
        path: "/Homemale"
      });
    },
    female() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="less">
.home-nav {
  .van-nav-bar {
    .van-image {
      top: 5px;
    }
    background: #b93321;
    .button-group {
      width: 100px;
      border-radius: 46px;
      margin: 0 auto;
      display: flex;
      line-height: 24px;
      padding-top: 10px;
      button {
        flex: 1;
        height: 26px;
        border: none;
        outline: none;
        border: 1px solid white;
        background: transparent;
        color: white;
        font-size: 14px;
        &:first-child {
          border-radius: 26px 0 0 26px;
        }
        &:last-child {
          border-radius: 0 26px 26px 0;
        }

        &.active {
          background: white;
          color: gray;
        }
      }
    }
    .van-icon {
      color: white;
      width: 24px;
      transform: scale(1.5);
    }
  }
}
</style>