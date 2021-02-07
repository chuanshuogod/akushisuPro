import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3e3483cc = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _b58f83fe = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _0207ca87 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _78661547 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _259ca445 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _3265aa0f = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _5f305894 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _3e3483cc,
    children: [{
      path: "",
      component: _b58f83fe,
      name: "home"
    }, {
      path: "/login",
      component: _0207ca87,
      name: "login"
    }, {
      path: "/register",
      component: _0207ca87,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _78661547,
      name: "profile"
    }, {
      path: "/settings",
      component: _259ca445,
      name: "settings"
    }, {
      path: "/editor",
      component: _3265aa0f,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _5f305894,
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
