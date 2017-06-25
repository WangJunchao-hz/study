/**
 * @Author: wangliang
 * @Date:   2017/3/31
 * @Last Modified by:   wangliang
 * @Last Modified time: 2017/3/31
 * @description {日期处理}
 */
;(function (global) {
    function DatePro() {

        this._initParams();
    }

    /**
     * @description {初始化参数}
     */
    DatePro.prototype._initParams = function () {
        var self = this;
        self.now = new Date();
    };

    /**
     * @description {{日期格式转换:月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)可以用 1-2 个占位符、周(E)可以用 1-3 个占位符
     *                          年(y)、季度(q)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)}
     * @param date[String][可选,默认返回当前时间] 要处理的日期
     * @param format[String][可选,默认"yyyy-MM-dd"] 格式
     * @return resultDate[String]
     */
    DatePro.prototype.format = function (date, format) {
        var self = this, resultDate;
        switch (arguments.length) {
            case 0:
                resultDate = _getDate(self.now, "yyyy-MM-dd");
                break;
            case 1:
                if (/(y+)|(M+)|(d+)|(h+)|(H+)|(m+)|(s+)|(S+)|(E+)|(q+)/.test(arguments[0])) {
                    resultDate = _getDate(self.now, arguments[0]);
                } else {
                    resultDate = _getDate(new Date(self._getCorrectDate(arguments[0])), "yyyy-MM-dd");
                }
                break;
            case 2:
                resultDate = _getDate(new Date(self._getCorrectDate(arguments[0])), arguments[1]);
                break;
        }
        function _getDate(date, format) {
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours() % 12 == 0 ? '上午' + date.getHours() : '下午' + date.getHours() % 12, //小时
                "H+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            var week = {
                "0": "日",
                "1": "一",
                "2": "二",
                "3": "三",
                "4": "四",
                "5": "五",
                "6": "六"
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(format)) {
                format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
            }
            if (/(q+)/.test(format)) {
                console.log(RegExp.$1.length);
                format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? (RegExp.$1.length > 3 ? "第" : "") : "") : "") + o["q+"] + ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? (RegExp.$1.length > 3 ? "季度" : "季度") : "季") : ""));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (o[k].length > 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return format;
        }

        return resultDate;
    };

    /**
     * @description {获取时间差}
     * @param startDate[String][可选,默认当前时间] 开始时间
     * @param endDate[String][可选] 结束时间
     * @param type[String][可选] 结束时间
     */
    DatePro.prototype.dif = function () {

    };

    /**
     * @description {获取时段}凌晨:3:00--6:00 早晨:6:00---8:00 上午:8:00--11:00 中午:11:00--13:00
     *                下午:13:00--17:00 傍晚:17:00--19:00 晚上:19:00--0:00 深夜:0:00--3:00
     * @return period[String]
     */
    DatePro.prototype.getPeriods = function () {
        var self = this,
            period,
            hours = self.now.getHours(),
            minutes = self.now.getMinutes(),
            time = parseFloat(hours + '.' + minutes);
        if (time > 3.00 && time <= 6.00) {
            period = '凌晨';
        } else if (time > 6.00 && time <= 8.00) {
            period = '早晨';
        } else if (time > 8.00 && time <= 11.00) {
            period = '上午';
        } else if (time > 11.00 && time <= 13.00) {
            period = '中午';
        } else if (time > 13.00 && time <= 17.00) {
            period = '下午';
        } else if (time > 17.00 && time <= 19.00) {
            period = '傍晚';
        } else if (time > 19.00 && time < 24.00) {
            period = '晚上';
        } else if (time >= 0 && time <= 3.00) {
            period = '深夜';
        }
        return period;
    };

    /**
     * @description {获取正确格式的日期}
     * @param date[String] 要处理的日期
     */
    DatePro.prototype._getCorrectDate = function (date) {
        return typeof date === 'string' ? date.replace(/-/g, '/') : date;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = new DatePro();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(new DatePro());
    } else {
        global.DatePro = new DatePro();
    }
})(typeof window !== 'undefined' ? window : global);
