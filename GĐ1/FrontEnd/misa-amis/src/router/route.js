import Vue from 'vue'
import VueRouter from 'vue-router';
import EmployeeList from '../components/view/employee/EmployeeList.vue'
import CustomerList from '../components/view/customer/CustomerList.vue'
Vue.use(VueRouter);
const routes=[
    {
        path: '/employee',
        component: EmployeeList
    },
    {
        path: '/customer',
        component: CustomerList
    }
]

const router = new VueRouter( {
    mode: 'history',
    routes
});

export default router;