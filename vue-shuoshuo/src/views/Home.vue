<template>
  <div class="home">
    <Homenav :active="false" :nactive="true" />
    <HomeSearch />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width:100%; height:144px" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <van-tabbar route>
      <van-tabbar-item replace to="/home">
        <img slot="icon" :src="img[0]" alt />
        书架
      </van-tabbar-item>
      <van-tabbar-item replace to="/home">
        <img slot="icon" :src="img[1]" alt />
        排行
      </van-tabbar-item>
      <van-tabbar-item replace to="/home">
        <img slot="icon" :src="img[2]" alt />
        VIP
      </van-tabbar-item>
      <van-tabbar-item replace to="/home">
        <img slot="icon" :src="img[3]" alt />
        充值
      </van-tabbar-item>
    </van-tabbar>
    <div class="jilu">
      <p>
        最近阅读 |
        <span>暂无阅读记录</span>
      </p>
    </div>
  <!-- @translate-currentid="$emit('translate-currentid',$event)"
@translate-currentid="$emit('translate-currentid',$event)"
@translate-currentid="$emit('translate-currentid',$event)" -->
    <div class="female-one">
      <h3>畅销短篇</h3>
    <ul>
        <Book v-for="(item, index) in manone" :key="index" :item="item" 
        
        />
      </ul>
    </div>

    <div class="female-one">
      <h3>女生佳作</h3>
  <ul>
        <Book v-for="(item, index) in mantwo" :key="index" :item="item" 
        
        />
      </ul>
    </div>

    <div class="female-one">
      <h3>女生红文区</h3>
   <ul>
        <Book v-for="(item, index) in manthree" :key="index" :item="item" 
        
        />
      </ul>
    </div>


    
  </div>
</template>

<script>
// @ is an alias to /src
import Homenav from "@/components/Homenav.vue";
import HomeSearch from "@/components/HomeSearch.vue";
import Book from "@/components/Book.vue";

export default {
  name: "home",
  components: {
    Homenav,
    HomeSearch,
    Book
  },
  data() {
    return {
      images: [
        "https://plf-new.zhuishushenqi.com/management/images/20191227/44b8da9d857448229a14894fbc9a08a5.jpg",
        "https://plf-new.zhuishushenqi.com/management/images/20191218/8ff1cffb162446149bf9cf268a075347.jpg",
        "https://plf-new.zhuishushenqi.com/management/images/20191227/65382c7e86c143448daa840031c47069.jpg",
        "https://plf-new.zhuishushenqi.com/management/images/20191218/3e86af2d9d374766b1a843eb9520dd15.jpg",
        "https://plf-new.zhuishushenqi.com/management/images/20191227/ea1ed1f79327419087fcf3cce35c91ce.jpg",
        "https://plf-new.zhuishushenqi.com/management/images/20191210/ad193aca91b14f7293c931d15bd75b91.jpg"
      ],
      img: [
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAM1BMVEVHcEz26/L36/L26/H26/H26/H36/H35ev26/H26/L/e4L6g4f/ubv/gon7i4/8q7D+ho3ioMi9AAAACnRSTlMAhUP/IeJf/ajGzgk+aQAABDBJREFUeNrtndtyJCEIhgcVxUym3fd/2s2mctydzDQ0CmTz36RqKhdfUQhoK5xOmiqpAlDviK3l3LBh7wRQUzl5VElPsPmGnuBdoZdKmHcJqboAT3uB38GTLXGlLBLVaMR23AUwHxTCWv9OPauor3PvqoT8bO41XlIxq2oBtjbyAuzU8xRN9O1CeZpoUiSpLU9Ugxlm7nmyurqxIS8QBDOzvrHnevMnz1aLfpQXikK5hqaLJMyL1Q5nmpoNVANEOuXYR9lIFJD5AHXPhuoBmYXUxswiasrmooDMbGrILgTu8+DB3JiyG+2uQwr6gcYSJdgJAh9lV6JQi5CxGEvzBt1KLIfe6daQHepOjinZpUo057jrIJCdCiJFjh0RhLJbUYA6aX/l1D1D9yD5e082R9/QGNDQ102N3qExoKGvmbr7h8ZQMfqrWN0jQPcQJentEhViQMPReNcUdGgpsuNdG9tZQdto8qhHXOSzlh542B8rVCbzdlbUxqIWe8c4q2rI/IMXpNtZWU0Uqk0NzTS10Ds2behN4h/M2HFWlyR+YCRolNUdttAv9UeNBV1FRzTG0CQqloyhUVRKG0M/O3WKBp0k9f+mLv5OwPFR6dcrEaNBI7ta8iDJPrypi70n55/SPKiLfWZT40FXwYmHOTQIIt4PtASaBCeP5tA9JjTGg8aY0C0edBOUHj/QEuj8A73MPdp/FvIuN/SZ6tpvFtCX8XhT443x/T/HRQlamsbvMD8RviKNK78Z1R6Pd/WKdO23g9AUD5rEOxdD9wD5dmvsZP7wn0Nr5xJyYxvyCKHEgy4nfh43h5bcqbGG7pKjXkHtoQpNkrse3NpDGxokny+4yUUbOkk+FHHTuDZ0kXySM4ZG0cdPY/cg0Wdmdu2hC11FH/SN43QRXZ2whUbZ9UdbaJDd6LWFfrvZ22yhL6yDGtkFyE0bemMHPH7QG9rQgx3w+P7RtKGbxDu4/jHsDE3iFwFtWDF/fhXAzC/DiBkPXa9vY/t1OayNe+kb4j9kiHEpiL7D45wIr3P6KeA7qHSK9+IMIz6iTOHeBX/1MjgFNHTMJ9i+02IJ17/hVgeH4vay7K3ORm7DXv1uTUmcdvi41x+ohnMOp4X1/U5d/iLInp5o7rL5ru5zzlLMzu6EEVvPxWzy5ylaM5pRp1CL0FmOYTaihkCBwxW1oHW2eT4XtaCmgMzG1OJW3xDKn82pD7WvryHi8z+50SCjHx/JsL56Qo35KD1I2DBcjmrTc9ZNGkHFWVZlUZ5RHmS1YuJPU590Nt/YU+aF1amePW2gHDT/QWOdj9DcmZQz5vYtmEepjb1ohGZSdJKFQ20LqSzJRovnBx+fVtotJvCmI6NsEcyGHQu5DYlf3BuYftLBxwTvBH3Xwmzd2sR/W7zCrSHeSFB9jnd/nUdP/c9EesSnPzRjGv1vvGbJhXBvG7oAAAAASUVORK5CYII="
      ],
      manone: [],
      mantwo: [],
      manthree: []
    };
  },
  methods: {
    getdatas() {
      this.axios
        .get(
          "http://novel.kele8.cn/search?keyword=宠妻"
        )
        .then(response => {
          //   window.console.log(response);
          this.manone = response.data.books.slice(0, 4);
          this.mantwo = response.data.books.slice(4, 8);
          this.manthree = response.data.books.slice(8, 12);
        });
    }
  },
  created() {
    this.getdatas();
  }
};
</script>
<style lang="less">
.van-card {
  .van-card__content p {
    font-size: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: normal;
    margin: 6px 2px;
  }
}
.female-one {
  h3 {
    border-left: 3px solid red;
    padding: 0 5px;
    font-size: 14px;
    height: 18px;
    line-height: 18px;
  }
}
.van-swipe__indicators {
  left: auto !important;
  right: 0;
}
.jilu {
  padding: 20px;
  & > p {
    color: #999;
    font-size: 10px;
  }
}
.van-tabbar {
  margin-top: 20px;
}

.van-tabbar-item {
  & > .van-tabbar-item__icon > img {
    width: 43px;
    height: 43px;
    // display: block;
  }
}
.van-tabbar--fixed {
  position: static !important;
  height: auto !important;
}
</style>
