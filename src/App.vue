<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        scrollMap: {}
      }
    },

    watch: {
      $route(to, from) {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        this.scrollMap[from.path] = scrollTop;
      }
    },

    updated() {
      let hashArr = window.location.hash.slice(1).split('?');
      let hash = hashArr[0];
      if (this.scrollMap[hash] && this.$route.meta.keepAlive) {
        document.documentElement.scrollTop = this.scrollMap[hash];
        window.pageYOffset = this.scrollMap[hash];
        document.body.scrollTop = this.scrollMap[hash];

      }
    }
  }
</script>

<style>
  #app {
    word-wrap: break-word;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
