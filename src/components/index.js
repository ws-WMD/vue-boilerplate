import LeftMenu from './LeftMenu'
import Tab from './tab'
import Top from './Top'

const components = {
  LeftMenu,
  Tab,
  TabPane: Tab.Pane,
  Top,
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
}

export default Object.assign(components, { install });