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
      path: "/custom",
      name: "custom",
      component: () => import("@/pages/sell_point/custom")
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("@/pages/sell_point/detail")
    },
    {
      path: "/jinhuo",
      name: "jinhuo",
      component: () => import("@/pages/sell_point/jinhuo")
    },
    {
      path: "/xiaohuo",
      name: "xiaohuo",
      component: () => import("@/pages/sell_point/xiaohuo")
    },
    {
      path: "/kucun",
      name: "kucun",
      component: () => import("@/pages/sell_point/kucun")
    },
    {
      path: "/visitation",
      name: "visitation",
      component: () => import("@/pages/visitation/visitation")
    },
    {
      path: "/other",
      name: "other",
      component: () => import("@/components/other")
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/components/test")
    }
  ]
});
