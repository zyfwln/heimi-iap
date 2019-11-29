import { StrChineseFirstPY } from './PY.js'

const checkCh = (_ch) => {
    let uni = _ch.charCodeAt(0)
    // 如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
    if (uni > 40869 || uni < 19968) return _ch
    // 检查是否是多音字,是按多音字处理,不是就直接在StrChineseFirstPY字符串中找对应的首字母
    // return (OMultiDiff[uni] ? OMultiDiff[uni] : (StrChineseFirstPY.charAt(uni - 19968)))
    return StrChineseFirstPY.charAt(uni - 19968)
}

const mkRslt = (_arr) => {
    let arrRslt = ['']
    for (let i = 0, len = _arr.length; i < len; i++) {
        let str = _arr[i]
        let strlen = str.length
        if (strlen == 1) {
            for (let k = 0; k < arrRslt.length; k++) {
                arrRslt[k] += str
            }
        } else {
            let tmpArr = arrRslt.slice(0);
            arrRslt = []
            for (let k = 0; k < strlen; k++) {
                // 复制一个相同的arrRslt
                let tmp = tmpArr.slice(0)
                // 把当前字符str[k]添加到每个元素末尾
                for (let j = 0; j < tmp.length; j++) {
                    tmp[j] += str.charAt(k)
                }
                // 把复制并修改后的数组连接到arrRslt上
                arrRslt = arrRslt.concat(tmp)
            }
        }
    }
    return arrRslt
}

const MKPY = (_s) => {
    if (typeof (_s) != 'string') throw new Error(-1, '需要字符串类型参数!')
    let arrResult = new Array()
    // 将字符串转码后转为数组
    for (let i = 0, len = _s.length; i < len; i++) {
        let ch = _s.charAt(i)
        arrResult.push(checkCh(ch))
    }
    return mkRslt(arrResult).length > 0 ? mkRslt(arrResult)[0].substr(0, 1) : null
}

export default MKPY