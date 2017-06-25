/**
 * @Author: wangliang
 * @Date:   2017/5/4
 * @Last Modified by:   wangliang
 * @Last Modified time: 2017/5/4
 * @description {requireJS配置文件}
 */
require.config({
    paths: {
        "zepto": "lib/zepto/1.2.0/zepto.min",
        "vue": "lib/vue/2.2.0/vue.min",
        "date": "lib/utils/date/1.0.0/date"
    },
    shim: {
        "api": {
            exports: "$api"
        }
    }
});
