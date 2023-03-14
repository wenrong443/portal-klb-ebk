import { createApp, h } from 'vue'
import App from './App.vue'
import { createRouterFunction } from './infrastructure';
import axiosInterceptors from './infrastructure/plugins/axiosInterceptors';
import axios from 'axios';
import createService from './infrastructure/services';
import 'bootstrap';
import './assets/js/paper-dashboard.js';
import VueSweetalert2 from 'vue-sweetalert2';
import messages from './domain/businessMessage';
import VueLoading from 'vue-loading-overlay';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import { jwtDecrypt } from "seedwork/jwtVerify"
import VueEasyLightbox from 'vue-easy-lightbox'

function getToken() {
    return localStorage.getItem('token');
}

const httpClient = axios.create({
    baseURL: process.env.SERVICE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

const noAuthHttpClient = axios.create({
    baseURL: process.env.SERVICE_URL,
});

axiosInterceptors.decorate(httpClient);
axiosInterceptors.decorate(noAuthHttpClient);

const jwtToken = jwtDecrypt(localStorage.getItem('token')) || "";
const permissions = jwtToken == "" ? [] : jwtToken.permissions.split(',');
const config = {
    service: createService({ httpClient, noAuthHttpClient }),
    permissions: permissions
}

const app = createApp({
    created() {
    },
    render: () => (
        h(App)
    )
});

app.config.globalProperties.$messages = messages;
app.config.globalProperties.$service = config.service;
app.config.globalProperties.$claims = permissions.reduce((a, v) => ({ ...a, [v]: true }), {});
app.config.globalProperties.$permissions = permissions;

const router = createRouterFunction(config);

window.$service = config.service;
app.use(router)
app.use(VueSweetalert2);
app.use(VueLoading);
app.use(VueReCaptcha, { siteKey: process.env.RECAPTCHA_KEY });
app.use(VueEasyLightbox)
app.mount('#app');

