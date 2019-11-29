import Utils from './Utils/index'
import LayoutBase from './LayoutBase'
import Header from './Header'
import FormTextarea from './FormTextarea'
import Uploader from './Uploader'
import List from './List'
import News from './News'
import Loading from './Loading'
import Collapse from './Collapse'

const Install = function (Vue) {
    Vue.component(LayoutBase.name, LayoutBase)
    Vue.component(Header.name, Header)
    Vue.component(FormTextarea.name, FormTextarea)
    Vue.component(Uploader.name, Uploader)
    Vue.component(List.name, List)
    Vue.component(News.name, News)
    Vue.component(Loading.name, Loading)
    Vue.component(Collapse.name, Collapse)

    Vue.prototype.$utils = Utils
}

if (typeof window !== 'undefined' && window.Vue) {
    Install(window.Vue)
}

export default Install