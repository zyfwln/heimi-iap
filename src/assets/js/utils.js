const isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const isColor = function (value) {
    const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
    const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

    return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

const scrollTop = function (el, from = 0, to, duration = 500, callback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) {
            typeof callback === 'function' && callback();
            return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }

    scroll(from, to, step);
};

const FormattedMoney = (_money) => {

    _money = Number(_money);
    _money = isNaN(_money) ? 0 : _money;

    return _money.toFixed(2);
}

const JSONParse = (json) => {
    return JSON.parse(json);
}

// 时间字符串转时间戳
const TimeStringToDate = (date) => {
    var time = new Date(Date.parse(YearMonthDate(date).replace(/-/g, "/")));
    return time.getTime();
}

// 时间字符串保留年月日
const YearMonthDate = (date) => {
    return (/\d{4}-\d{1,2}-\d{1,2}/g.exec(date))[0];
}

const isEmpty = (_val) => {
    if (_val === null || _val === 'null') return true
    if (_val === undefined || _val === 'undefined') return true
    if (_val === "") return true
    if (_val.length === 0) return true
    if (!/[^(^\s*)|(\s*$)]/.test(_val)) return true
    return false
}

/**
 * 两数相除
 * @param {Number || String} m 分子 
 * @param {Number || String} d 分母
 */
const GetRatio = (m, d) => {
    d = parseFloat(d) || 0.0
    d = Number(d) === 0 ? 1.0 : d
    return Number(((parseFloat(m) || 0.0) / d).toFixed(2))
}

/**
 * 取百分比
 * @param {Number || String} m 分子
 * @param {Number || String} d 分母
 */
const GetPercentage = (m, d) => {
    return Number((GetRatio(m, d) * 100).toFixed(2))
}

export { isIOS, isColor, scrollTop, FormattedMoney, JSONParse, TimeStringToDate, isEmpty, GetRatio, GetPercentage }