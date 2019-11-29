const Utils = {
    MoneyFormat (_n) {
        _n = Number(_n)
        if (_n >= 10000)  return (_n / 10000).toFixed(2) + '万'
        else if (_n >= 1000) return (_n + '').replace(/\d(?=(\d{3})+$)/g, '$&,')
        else if (_n > 0) return _n
        else return 0
    },
    NumberFormat (n) {
        n = Number(n)
        n = String(n)
        let float = ''
        let i = n.indexOf('.')
        if (i >= 0) {
            float = n.substring(i)
            n = n.substr(0, i + 1)
        }
        n = Number(n)

        return n && typeof n == 'number' ? (n >= 1000 ? (n + '').replace(/\d(?=(\d{3})+$)/g, '$&,') : n) + float : 0
    }
}

export default Utils