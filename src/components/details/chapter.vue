<template>
  <div class="chapter">
    <div class="chapters" id="chapterList_1" style="display: block;">
      <ul class="am-avg-sm-4 am-thumbnails list hide">
        <li v-for="chapter in chapterList">
          <div class="d-nowrap" @click="toContent(chapter)" :class="{ 'active': chapter.selected === 1 }"> {{chapter.name}}</div>
        </li>
      </ul>
      <p class="more">
        <a @click="getMore" class="mm" v-show="show">查看更多</a></p>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    created: function () {

      this.init();
    },
    data() {
      return {
        bookId: 1,
        chapterList: [],
        page: 1,
        pageSize: 20,
        count: 0,
        show: true
      }
    },
    computed: {},
    methods: {
      init() {
        this.bookId = this.$route.query.part;
        this.page = 1;
        this.chapterList = [];
        this.getChapterList(this.bookId, this.page, this.pageSize);
      },
      toContent: function (chapter) {
        let list = this.chapterList;
        for (let item of list) {
          item.selected = (item.id === chapter.id ? 1 : 0);
        }
        this.chapterList = [];
        this.chapterList.push(...list);


        this.$router.push({path: 'content', query: {id: chapter.id, name: chapter.name}});
      },
      getChapterList: function (id, page, pageSize) {
        let baseUrl = process.env.DOMAIN;
        let that = this;
        axios.get(
          baseUrl + '/book/' + id + '/chapters', {
            params: {
              'page': page,
              'pageSize': pageSize
            }
          }
        ).then(function (res) {
          that.chapterList.push(...res.data.dataList);
          ++that.page;
          that.showTotal(res.data.totalCount);
        }).catch(function (err) {
          console.log(err)
        });
      },
      showTotal(count) {
        this.$emit('showTotal', count)
      },
      getMore() {
        this.getChapterList(this.bookId, this.page, this.pageSize);
        if (++this.count > 2) {
          this.getMoreChapters();
        }
      },
      getMoreChapters() {
        let baseUrl = process.env.DOMAIN;
        let that = this;
        axios.get(
          baseUrl + '/book/' + that.bookId + '/chapters/all'
        ).then(function (res) {
          that.chapterList = res.data;
          that.show = false;
        }).catch(function (err) {
          console.log(err)
        });
      }
    },
    components: {},
    beforeRouteLeave(to, from, next) {
      from.meta.isBack = true;
      next();
    },
    activated() {
      if (!this.$route.meta.isBack) {
        this.init();
      }
    }
  }
</script>

<style scoped="scoped">
  .chapterList .chapters {
    padding-bottom: 10px;
  }

  .chapterList .list .hide {
    height: auto;
    overflow: hidden;
  }

  .chapterList .list {
    padding: 10px;
  }

  .am-thumbnails {
    margin-left: -.5rem;
    margin-right: -.5rem;
  }

  .chapterList .list li {
    text-align: center;
    padding: 5px;
    height: 30px;
    line-height: 30px;
  }

  .chapterList .d-nowrap {
    display: block;
    border-radius: 3px;
    font-size: 13px;
    color: #444;
    border: 1px solid #eee;
  }

  .active {
    background: #d93d40 !important;
    color: #fff;
  }

  .chapterList .more {
    color: #999;
    text-align: center;
    font-size: 13px;
    padding: 10px 0 0;
  }

  .chapterList .more {
    position: relative;
    margin: 0;
    height: 40px;
  }

  .am-avg-sm-4 > li {
    width: 25%;
    display: block;
    height: auto;
    float: left;
  }

  .chapterList .more {
    color: #999;
    text-align: center;
    font-size: 13px;
    padding: 10px 0 0;
  }

  .chapterList .more a {
    color: #767676;
    border: 1px solid #E0E0E0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    border-radius: 15px;
    width: 90px;
  }

  ul {
    width: 100%;
  }
</style>
