import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7872cf49 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _249d44be = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _6f439b6a = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _f41d8d2c = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _6d13f6fc = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _6ca3f58c = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _6cbb7cb7 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _7872cf49,
    children: [{
      path: "",
      component: _249d44be,
      name: "home"
    }, {
      path: "/login",
      component: _6f439b6a,
      name: "login"
    }, {
      path: "/register",
      component: _6f439b6a,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _f41d8d2c,
      name: "profile"
    }, {
      path: "/settings",
      component: _6d13f6fc,
      name: "settings"
    }, {
      path: "/editor",
      component: _6ca3f58c,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6cbb7cb7,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
