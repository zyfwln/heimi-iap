//- 日期格式化
Date.prototype.DateFormat = function (fmt) {
    fmt = fmt || 'yyyy-MM-dd';

    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

let insertStr = (soure, start, newStr) => {
    return soure.slice(0, start) + newStr + soure.slice(start)
}

Number.prototype.ToFloat = function (n) {
    n = Number(n) ? Number(n) : 2
    let pow = Math.pow(10, n)
    let num = parseInt(this * pow)
    if (this < 1) {
        return Number(String(this).substr(0, n + 2))
    } else {
        num = insertStr(String(num), -n, '.')
        return Number(num)
    }
}