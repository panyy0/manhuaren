<template>
  <div class="original">
    <v-partHeader :name="title"></v-partHeader>
    <mt-loadmore class="classList" :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">

      <ul class="am-avg-sm-3 am-thumbnails list">
        <li class="am-thumbnail" v-for="item in bookList" @click="showDetails(item.id)">
          <div class="container">
            <img v-lazy="item.cover" alt="">
            <span class="tip">{{item.progress}}</span>
          </div>
          <p class="d-nowrap">{{item.name}}</p>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">加载中...</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import header from '../header/header'
  import partHeader from '../header/partHeader'
  import {Toast} from "mint-ui";

  export default {
    created() {
      this.getData();
    },
    data() {
      return {
        title: '全部漫画',
        topStatus: '',
        page: 1,
        pageSize: 9,
        bookList: [],
        totalPage: 1
      }
    },
    computed: {},
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
        if (status === 'loading') {
          if (this.page > this.totalPage) {
            Toast({
              message: '已经是全部漫画了', //弹窗内容
              position: "middle", //弹窗位置
              duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
            });
            return;
          }
          this.getData();
        }
      },
      showDetails(e) {
        this.$store.state.currentChapter.parentId = e;
        this.$router.push({path: 'details'});
      },
      loadTop() {
        // ...// 加载更多数据
        this.$refs.loadmore.onTopLoaded();
      },
      getData() {
        //这里修改为之后分页加载
        let that = this;
        let params = {
               page: that.page,
               pageSize: that.pageSize
           };
        that.request.get('/book/list/more', { params }, function (res) {
          let data = res.data;
          ++that.page;
          that.totalPage = data.totalPage;
          that.bookList.push(...data.dataList);
        });
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
