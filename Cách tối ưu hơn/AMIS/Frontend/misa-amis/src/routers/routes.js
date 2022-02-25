import Home from '../views/Home.vue'
import Employee from '../views/Employee.vue'
import VueRouter from 'vue-router';

const routes = [
    { path: "/", redirect: '/home' },
    {
        path: "/home", 
        name: "home", 
        component: Home
    },
    {
        path: "/CAProcess",
        component: Employee
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;