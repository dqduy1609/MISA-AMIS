import Home from '../views/Home.vue'
import Employee from '../views/Employee.vue'
import VueRouter from 'vue-router';
import CashPage from '../views/CashPage.vue'
import ProviderList from '../views/provider/ProviderList.vue'
import CAPayment from '../views/ca_payment/CAPayment.vue'
const routes = [
    { path: "/", redirect: '/home' },
    {
        path: "/home", 
        name: "home", 
        component: Home
    },
    {
        path: "/Cash/Employees",
        component: Employee
    },
    {
        path:"/Cash",
        component: CashPage
    },
    {
        path: "/Cash/Provider",
        component: ProviderList
    },
    {
        path:"/Cash/CAPayment",
        component: CAPayment
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;