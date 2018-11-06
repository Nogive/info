import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home/home")
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/components/test")
    }
  ]
});
