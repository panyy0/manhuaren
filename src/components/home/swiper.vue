<template>
  <div class="swiper-container">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item, index) of listImg" :key="index">
        <img :src="item.banner" class="img" @click="handleChange(item.id)"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>

  //图片地址 写在模板不出错，是因为你已经有模板的图片解析器了，在JS中需要import
  export default {
    data() {
      return {}
    },
    props: {
      listImg: {
        type: Array,
        default: () => []
      }
    },
    mounted() {

    },
    methods: {
      handleChange(id) {
        console.log("id=" + id);
        this.$parent.showDetails(id);
      }
    }
  }
</script>

<style lang="less">
  .swiper-container {
    box-shadow: 0 0 2px rgba(0, 0, 0, .15);
    width: 100%;
    height: 10rem;

    .img {
      width: 100%;
      height: 100%;
    }
  }
</style>
