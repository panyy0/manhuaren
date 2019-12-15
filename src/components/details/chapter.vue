<template>
  <div class="chapter">
    <div class="chapters" id="chapterList_1" style="display: block;">
      <ul class="am-avg-sm-4 am-thumbnails list hide">
        <li v-for="(chapter, index) in chapterList">
          <div class="d-nowrap" @click="toContent(chapter, index)" :class="{ 'active': chapter.selected === 1 }">
            {{chapter.name}}
          </div>
        </li>
      </ul>
      <p class="more">
        <a @click="getMore" class="mm" v-show="show">查看更多</a></p>
    </div>

  </div>
</template>

<script>

  export default {

    data() {
      return {
        bookId: 1,
        chapterList: [],
        page: 1,
        pageSize: 20,
        count: 0,
        totalPage: 0,
        totalCount: 0,
        show: true,
      }
    },
    computed: {},
    methods: {
      init() {
        this.chapterList = [];
        this.bookId = this.$store.state.currentChapter.parentId;
        this.page = 1;
        this.show = true;
        this.count = 0;
        this.getChapterList(this.bookId, this.page, this.pageSize);
      },
      toContent: function (chapter, index) {
        let chapterId = chapter.id;
        let that = this;
        if (index === 0) {
          chapter.isEnd = true;
        }
        if (index === that.totalCount - 1) {
          chapter.isFirst = true;
        }
        that.populateChapter(chapter);
        that.listSelected(chapterId);
        that.$router.push({path: 'content'});
      },
      getChapterList: function (id, page, pageSize) {
        let that = this;
        let config = {
          params: {
            'page': page,
            'pageSize': pageSize
          }
        };
        that.request.get('/book/' + id + '/chapters', config, function (res) {
          that.chapterList.push(...res.data.dataList);
          let list = that.chapterList;
          that.chapterList = [];
          that.chapterList.push(...list);
          that.totalPage = res.data.totalPage;
          that.totalCount = res.data.totalCount;
          that.showTotal(res.data.totalCount);
          if (that.page >= that.totalPage) {
            that.show = false;
          }
          ++that.page;
        })
      },
      showTotal(count) {
        this.$emit('showTotal', count)
      },
      getMore() {

        if (++this.count > 2) {
          this.getMoreChapters();
        } else {
          this.getChapterList(this.bookId, this.page, this.pageSize);
        }
      },
      getMoreChapters() {
        let that = this;
        that.request.get('/book/' + that.bookId + '/chapters/all', {}, function (res) {
          that.chapterList = [];
          that.chapterList.push(...res.data);
          that.show = false;
          that.count = 0;
          that.totalCount = that.chapterList.length;
        });
      },
      listSelected(chapterId) {
        let list = this.chapterList;

        for (let item of list) {
          item.selected = (item.id === chapterId ? 1 : 0);
        }
        this.chapterList = [];
        this.chapterList.push(...list);
      },
      populateChapter(chapter) {
        this.$store.state.currentChapter.id = chapter.id;
        this.$store.state.currentChapter.name = chapter.name;
        this.$store.state.currentChapter.isFirst = chapter.isFirst === true;
        this.$store.state.currentChapter.isEnd = chapter.isEnd === true;
      }
    },
    components: {},
    beforeRouteLeave(to, from, next) {
      if (to.name === 'content') {
        if (!from.meta.keepAlive) {
          from.meta.keepAlive = true;
        }
        from.meta.isBack = true;
      } else {
        from.meta.keepAlive = false;
        from.meta.isBack = false;
        to.meta.keepAlive = false;
        this.$destroy();
      }
      next();
    },
    activated() {
      if (!this.$route.meta.isBack) {
        this.init();
      } else {
        let chapterId = this.$store.state.currentChapter.id;
        console.log('chapter id is ' + chapterId);
        if (chapterId) {
          this.listSelected(chapterId);
        }
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
