import { Toast } from 'vant';
import axios from 'axios'
import store from './store'
import router from './router'

var Loading = {
    close: ()=> {}
};

axios.interceptors.request.use(config => {
    config.retry = 3;
    config.retryDelay = 1000;
    config.timeout = 10000;
    config.method = 'post';
    config.baseURL = '/employee';
    // config.baseURL = 'http://employee.heymisoft.com/employee';

    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    Toast('请求超时，亲检查一下网络');
    return Promise.reject(error)
});

axios.interceptors.response.use(
    _response => {
        Loading.close();
        let code = _response.data.code;
        
        if (code == 200 && _response.data.data) {
            return _response.data.data;
        }
        else if (code == 100) {
            Toast(_response.data.msg || '用户不存在或密码不正确');
        }
        else if (code == 401) {
            Toast('登录密钥已过期，请重新登录');
            router.replace({ path: '/login' });
        }
        else {
            Toast(_response.data.msg);
        }
        return Promise.reject('')
    },
    _error => {
        Loading.close();
        let config = _error.config;
        // 如果未设置请求次数，reject
        if (!config || !config.retry || config.__retryCount > 3) {
            Toast('服务器响应超时，找工程师');
            return Promise.reject(_error)
        }

        // 重新请求的次数
        config.__retryCount = config.__retryCount || 0;

        // 是否已注销注销了总重试次数
        if (config.__retryCount >= config.retry) {
            Toast('服务器响应超时，找工程师');
            return Promise.reject(_error);
        }

        // 请求次数+1
        config.__retryCount += 1;

        let backoff = new Promise(_resolve => {
            setTimeout(() => {
                _resolve();
            }, config.retryDelay || 1);
        });

        return backoff.then(() => axios(config));
    }
)

const Install = (Vue) => {

    Vue.prototype.$ajax = axios
}

if (typeof window !== 'undefined' && window.Vue) {
    Install(window.Vue);
}

export default Install;