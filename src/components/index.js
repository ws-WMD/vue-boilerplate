import LeftMenu from './LeftMenu'
import Tab from './tab'
import Top from './Top'
import SideNav from './SideNav'

const components = {
  LeftMenu,
  Tab,
  TabPane: Tab.Pane,
  Top,
  SideNav,
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });
}

export default Object.assign(components, { install });