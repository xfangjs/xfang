import { App, Component, load } from './xfang.js'

let data = {
  message: 'Hello, World!',
  count: 0,
  url: 'https://github.com/intfract',
  closed: true,
  button: '<button>Button</button>',
}

let methods = {
  increment() {
    count++
  },
  greet() {
    console.log('Hello')
  }
}

const greeter = new Component('button', 'Click to Greet', {
  'x-on:click': 'greet()',
  'x': '',
})

greeter.attach('#component-demo')

console.log(greeter)

const app = new App(data, methods)
app.mount(greeter)
load(app)