import { App, load } from './xfang.js'

let data = {
  message: 'Hello, World!',
  count: 0,
  url: 'https://github.com/intfract',
}

let methods = {
  increment() {
    count++
  },
}

const app = new App(data, methods)
load(app)
