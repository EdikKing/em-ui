import type { App } from 'vue'
import Button from './Button/Button.vue'
import NavBar from './NavBar/NavBar.vue'
import TabBar from './TabBar/TabBar.vue'
import Row from './Layout/Row/Row.vue'
import Col from './Layout/Col/Col.vue'
import Tabs from './Tabs/Tabs.vue'
import TabPane from './Tabs/TabPane.vue'

const components = {
  Button,
  NavBar,
  TabBar,
  Row,
  Col,
  Tabs,
  TabPane
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(`mobile-${name}`, component)
    })
  }
}

export { Button, NavBar, TabBar, Row, Col, Tabs, TabPane } 