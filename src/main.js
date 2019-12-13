// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//import home from './components/home/home'
import request from './util/common'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.prototype.request = request;
Vue.use(Mint);
new Vue({
router,
store,
template: '<App/>',
components: {App}
}).$mount('#app');



router.push('home');
