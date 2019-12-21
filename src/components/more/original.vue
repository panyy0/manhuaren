<template>
  <div class="original">
    <v-partHeader :name="original.title"></v-partHeader>
    <mt-loadmore class="classList" :top-method="loadTop" @top-status-change="handleTopChange">

      <ul class="am-avg-sm-3 am-thumbnails list">
        <li class="am-thumbnail" v-for="items in original.imgList" @click="showDetails(items.id)">
          <div class="container">
            <img :src="items.cover" alt="">
            <span class="tip">{{items.progress}}</span>
          </div>
          <p class="d-nowrap">{{items.name}}</p>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import header from '../header/header'
  import partHeader from '../header/partHeader'

  export default {
    data() {
      return {
        topStatus: '',
      }
    },
    computed: {
      original() {
        //这里修改为之后分页加载
        return this.$store.state.getHomeData.home
      }
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      showDetails(e) {
        this.$store.state.currentChapter.parentId = e;
        this.$router.push({path: 'details'});
      },
      loadTop() {
      // ...// 加载更多数据
      //   this.$refs.loadmore.onTopLoaded();
        console.log('fasdasdsadasd');
      }
    },
    components: {
      'v-header': header,
      'v-partHeader': partHeader
    },
    beforeRouteLeave(to, from, next) {
      to.meta.isBack = false;
      next();
    },
  }
</script>

<style lang='scss' scoped="scoped">
  .d-nowrap {
    padding-top: 5px;
  }

  .am-thumbnails {
    margin-left: -.5rem;
    margin-right: -.5rem;
  }

  .classList {
    padding: 10px;
    margin-top: 45px;
  }

  li .container {
    position: relative;
    height: 10rem;
  }

  li .container img {
    border-radius: 3px;
    width: 100%;
    height: 100%;
  }

  li {
    display: inline-block;
    border: 0;
    background-color: transparent;
    margin-bottom: 0;
    padding: 0 .5rem 1.5rem;
    width: (100%/3);
  }

  img {
    box-sizing: border-box;
    vertical-align: middle;
  }

  li .tip {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25px;
    line-height: 25px;
    background-color: #000;
    opacity: 0.8;
    -moz-opacity: 0.8;
    text-align: center;
    color: #fff;
    width: 100%;
    font-size: 11px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .d-nowrap {
    white-space: nowrap;
    font-size: 12px;
    text-align: center;
  }

  .partHeader {
    position: fixed;
    top: 0;
    z-index: 20;
    width: 100%;
  }

</style>
