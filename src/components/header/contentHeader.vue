<template>
  <div class="header">
    <div class="topBar">
      <img src="./img/icon_back.png" class="backlogo" @click="back">
      <span class="title d-nowrap">{{name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      name: {
        type: String
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped lang="scss">

  .header {
    display: block;
    position: fixed;
    height: 45px;
    width: 100%;
  }
  .topBar {
    height: 45px;
    padding: 13px;
    font-size: 0;
    background-color: #fff36b;
    width: 100%;
    text-align: center;
    line-height: 17px;
  }

  .topBar img.backlogo {
    position: absolute;
    left: 15px;
    height: 12px;
    top: 17px;
  }

  .topBar .title {
    font-size: 12px;
    display: inline-block;
    width: 50%;
    line-height: 20px;
  }

  .d-nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
