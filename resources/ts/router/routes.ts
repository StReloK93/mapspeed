export default [
   { path: "", component: () => import("@/pages/HomePage.vue") },
   { path: "/geozones", component: () => import("@/pages/GeozonesPage.vue") },
   { path: "/greyders", component: () => import("@/pages/GreydersPage.vue") },
]