import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import original from '@/components/more/original'
import details from '@/components/details/details'
import chapter from '@/components/details/chapter'
import others from '@/components/details/others'
import comment from '@/components/details/comment'
import content from '@/components/details/content'

//VueResource使用做http请求的
//Vue.use(VueResource) 
Vue.use(Router);

const routes = [
  {name: 'home', path: '/home', component: home},
  {name: 'original', path: '/original', component: original},
  {name: 'content', path: '/content', component: content},
  {
    name: 'details', path: '/details', component: details,
    redirect: '/chapter',
    children: [
      {
        path: '/chapter',
        component: chapter
      },
      {
        path: '/others',
        component: others
      },
      {
        path: '/comment',
        component: comment
      }
    ]
  }

]

const router = new Router({
  routes // （缩写）相当于 routes: routes
})

export default router
