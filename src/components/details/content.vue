<template>
  <div class="content">
    <div class="header">
      <v-header :name="name"></v-header>
    </div>

    <div class="content-list">
      <ul>
        <li class="am-thumbnail" v-for="item in lessonList">
          <img :src="item.content" alt="" class="originalImg"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import header from '../header/contentHeader'
  import axios from 'axios'
  export default {
    created() {
      this.init()
    },
    data() {
      return {
        id: '',
        name: '',
        lessonList: []
      }
    },
    methods: {
      init() {
        let id = this.$route.query.id;
        this.id = id;
        this.name = this.$route.query.name;
        this.getData(id)
      },

      getData(id) {
        let baseUrl = process.env.DOMAIN;
        let that = this;
        axios.get(
          baseUrl + '/chapter/' + id + '/lessons')
          .then(function (res) {
          that.lessonList = res.data;
        }).catch(function (err) {
          console.log(err)
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

</style>
