<template>
  <div class="chapter">
    <div class="chapters" id="chapterList_1" style="display: block;">
      <ul class="am-avg-sm-4 am-thumbnails list hide">
        <li v-for="chapter in chapterList">
          <div class="d-nowrap"> {{chapter.name}}}</div>
        </li>
      </ul>
      <p class="more">
        <a class="mm">查看更多</a></p>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    created: function () {
      let id = this.$route.query.part;
      this.getChapterList(id);
    },
    data() {
      return {
        chapterList: [],
        page: 1,
        pageSize: 20
      }
    },
    computed: {
//	   	top(){
//	   		return this.$store.state.getTopData.top;
//	   		    console.log("计算函数调用")
//	   	}
    },
    methods: {
      getChapterList: function (id) {
        let baseUrl = process.env.DOMAIN;
        let that = this;
        axios.get(
          baseUrl + '/book/' + id + '/chapters', {
            params: {
              'page': that.page,
              'pageSize': that.pageSize
            }
          }
        ).then(function (res) {
          console.log("chapter res is " + res);
          that.chapterList = res.data.dataList;
          that.pageSize = res.data.pageSize;
        }).catch(function (err) {
          console.log(err)
        });
      }
    },
    components: {}
  }
</script>

<style scoped="scoped">
  .chapterList .chapters {
    padding-bottom: 10px;
  }

  .chapterList .list.hide {
    max-height: 215px;
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

  .chapterList .more {
    color: #999;
    text-align: center;
    font-size: 13px;
    padding: 0;
    padding-top: 10px;
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
    padding: 0;
    padding-top: 10px;
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
