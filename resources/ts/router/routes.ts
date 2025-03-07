export default [
   { path: "", component: () => import("@/pages/HomePage.vue") },
   { path: "/geozones", component: () => import("@/pages/GeozonesPage.vue") },
   { path: "/trucks", component: () => import("@/pages/TrucksPage.vue") },
   { path: "/graders", component: () => import("@/pages/GreydersPage.vue") },
   { path: "/water-truck", component: () => import("@/pages/WaterTruckPage.vue") },
   { path: "/offenders", component: () => import("@/pages/OffendersReportPage.vue") },
   { path: "/ways", component: () => import("@/pages/WaysPage.vue") },
   { path: "/ways-redactor", component: () => import("@/pages/WaysRedactor.vue") },
]

