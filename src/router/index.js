import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/home/home")
    },
    {
      path: "/sell_point/:mode",
      name: "sell_point",
      component: () => import("@/pages/sell_point/sell_point"),
      meta: {
        title: ["售点信息", "售点拜访"]
      }
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/components/test")
    }
  ]
});
