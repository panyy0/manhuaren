<template>
  <div class="content">
    <div class="header">
      <v-header :name="name"></v-header>
    </div>

    <div id="list_content" class="content-list">
      <ul>
        <li class="am-thumbnail" v-for="item in lessonList">
          <img v-lazy="item.content" alt="" class="originalImg"/>
        </li>
      </ul>
      <div class="pagenation" v-show="showPage">
        <div class="half">
          <div class="prev" :style="prevObj" @click="prev()">< 上一章</div>
        </div>
        <div class="half">
          <div class="next" :style="nextObj" @click="next()">下一章 ></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import header from '../header/contentHeader'
  import { Toast } from "mint-ui";

  let activeObj = {
    color: '#757575'
  };

  let disabledObj = {
    color: '#ACA899',
    opacity: 1
  };
  export default {
    created() {
      this.init()
    },
    data() {
      return {
        name: '',
        lessonList: [],
        showPage: false,
        prevObj: activeObj,
        nextObj: activeObj
      }
    },
    methods: {
      init() {
        let chapter = this.$store.state.currentChapter;
        this.name = chapter ? chapter.name : '';
        if (chapter) {
          this.populateChapter(chapter);
          this.getData(chapter.id);
        }
      },

      getData(id) {
        if (!id) {
          return;
        }
        let that = this;
        that.request.get('/chapter/' + id + '/lessons', {}, function (res) {
          that.lessonList = [];
          let list = res.data;
          that.getContentLoaded(list);
          that.showPage = true;
        })
      },
      prev() {
        let chapter = this.$store.state.currentChapter;
        if (chapter.isFirst) {
          this.toast('已经是第一章');
          return;
        }
        let that = this;
        that.request.get('/chapter/' + chapter.id + '/prev/lessons', {}, function (res) {

          let result = res.data;
          if (!result.name) {
            this.toast('已经是第一章');
            return;
          }
          that.lessonList = [];
          that.$forceUpdate();
          that.populateChapter(result);
          if (result.lessonVOList.length > 0) {
            let list = result.lessonVOList;
            that.getContentLoaded(list);
          }
        });
      },

      next() {
        let chapter = this.$store.state.currentChapter;
        if (chapter.isEnd) {
          this.toast('已经是最后一章');
          return;
        }
        let that = this;
        that.request.get('/chapter/' + chapter.id + '/next/lessons', {}, function (res) {
          let result = res.data;
          if (!result.name) {
            this.toast('已经是最后一章');
            return;
          }
          that.lessonList = [];
          that.$forceUpdate();
          that.scrollToTop();
          that.populateChapter(result);
          if (result.lessonVOList.length > 0) {
            let list = result.lessonVOList;
            // that.lessonList.push(...list);
            that.getContentLoaded(list);
          }
        });
      },

      populateChapter(chapter) {
        this.$store.state.currentChapter.id = chapter.id;
        this.$store.state.currentChapter.name = chapter.name;
        this.$store.state.currentChapter.isFirst = chapter.isFirst === true;
        this.$store.state.currentChapter.isEnd = chapter.isEnd === true;
        this.name = chapter.name;
        this.prevObj = chapter.isFirst ? disabledObj : activeObj;
        this.nextObj = chapter.isEnd ? disabledObj : activeObj;
      },
      getContentLoaded(contentList) {
        this.scrollToTop();
        this.lessonList.push(...contentList);
      },

      scrollToTop() {
        document.getElementById('list_content').scrollTop = 0;
      },

      toast(message) {
        Toast({
          message: message, //弹窗内容
          position: "middle", //弹窗位置
          duration: 2000, //弹窗时间毫秒,如果值为-1，则不会消失
        });
      }
    },
    components: {
      'v-header': header,
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    height: 100%;

  }

  .content .content-list {
    width: 100%;
    height: 100%;
    top: 45px;
    position: fixed;
    overflow: auto;
    padding-bottom: 45px;
  }

  .am-thumbnail img {
    width: 100%;
  }

  .pagenation {
    height: 60px;
    margin-bottom: 2px;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    background-color: white;
    display: flex;
    flex-direction: row;
  }

  .half {
    display: flex;
    width: 49%;
    padding: 15px 0;
  }

  .half .prev {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    line-height: 100%;
    color: #757575;
    font-size: 1rem;
    border-right: 1px solid #e3e3e3;
  }

  .half .next {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    line-height: 100%;
    color: #757575;
    font-size: 1rem;
  }

</style>
