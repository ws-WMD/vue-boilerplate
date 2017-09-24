import LeftMenu from './LeftMenu'
import Tab from './Tab'
import Top from './Top'

const components = {
  LeftMenu,
  Tab,
  Top,
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
}

export default Object.assign(components, { install });