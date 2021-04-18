import Vue from "vue";
import VueRouter from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";

import Dashboard from "../views/Dashboard.vue";
import Employee from "../views/Employee.vue";
import EmployeeDetails from "../views/EmployeeDetails.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "DashboardLayout",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/employee",
        name: "Employee",
        component: Employee,
      },
      {
        path: "/employeeDetails/:id",
        name: "EmployeeDetails",
        component: EmployeeDetails,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
