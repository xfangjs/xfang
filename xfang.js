export class App {
  constructor(data, methods, all) {
    this.data = data
    this.methods = methods
    if (all) {
      this.selector = '*'
    } else {
      this.selector = '[x]'
    }
    this.links = []
    class X extends HTMLElement {
      constructor() {
        super()
      }
    }
    customElements.define('x-app', X)
    const e = document.createElement('x-app')
    e.style.cssText = 'display:none !important;'
    document.body.appendChild(e)
  }

  mount() {
    const e = document.querySelectorAll(this.selector)
    const x = this.define()
    // console.log(x)
    function render(str) {
      return (new Function(`${x} return ${str}`))()
    }
    for (let i = 0; i < e.length; i++) {
      let b = e[i].getAttribute('x')
      let z = e[i].getAttribute('x-socket')
      if (b) {
        e[i].innerHTML = render(b)
      } else if (z) {
        const k = document.querySelector(`[x-wire="${z}"]`)
        const p = k.innerHTML.trim().split('{')
        for (let i = 0; i < p.length; i++) {
          if (p[i].includes('}')) {
            const w = p[i].split('}')
            const m = w[0]

            p[i] = render(m)
            p.splice(i + 1, 0, w[1])
          }
        }

        const s = p.join('')

        e[i].innerHTML = s
      } else {
        const p = e[i].innerHTML.trim().split('{')
        let q = false
        for (let i = 0; i < p.length; i++) {
          if (p[i].includes('}')) {
            const w = p[i].split('}')
            const m = w[0]

            p[i] = render(m)
            p.splice(i + 1, 0, w[1])

            q = true
          }
        }

        const s = p.join('')

        if (q) {
          e[i].setAttribute('x-socket', this.links.length)

          const h = document.createElement('aside')
          h.setAttribute('x-wire', this.links.length)
          h.style.cssText = 'display:none !important;'
          h.innerHTML = e[i].innerHTML
          document.querySelector('x-app').appendChild(h)
          this.links.push(this.links.length)

          e[i].innerHTML = s
        }
      }
      const a = e[i].getAttributeNames()
      for (const attr of a) {
        if (attr.startsWith(':') || attr.startsWith('x-bind:')) {
          let d = e[i].getAttribute(attr)
          const target = attr.replace(/[ -~]*:/g, '')
          if (target === 'class' || target === 'style') {
            console.log('special binding')
          } else {
            e[i].setAttribute(target, render(d))
          }
        } else if (attr.startsWith('@') || attr.startsWith('x-on:')) {
          let d = e[i].getAttribute(attr)
          const target = attr.replace(/[ -~]*[:@]/g, '')
          const action = (new Function(`${x} ${this.declare()} ${d}; return ${this.unpack()}`))
          e[i].onclick = () => {
            this.data = action()
          }
        }
      }
    }
  }

  define() {
    let s = ''
    for (const [k, v] of Object.entries(this.data)) {
      if (typeof v === 'string') {
        s += `let ${k} = '${v}'; `
      } else if (typeof v === 'number') {
        s += `let ${k} = ${v}; `
      } else if (typeof v === 'function') {
        const f = v.toString().match(/\([	-~]*/g)[0]
        s += `function ${k}${f};`.replace(/=>/g, '')
      } else if (Array.isArray(v)) {
        s += `const ${k} = ${JSON.stringify(v)}`
      }
    }
    return s
  }

  unpack() {
    let s = '{'
    for (const [k, v] of Object.entries(this.data)) {
      s += `${k}: ${k},`
    }
    s += '};'
    return s
  }

  declare() {
    let s = ''
    for (const [k, v] of Object.entries(this.methods)) {
      if (typeof v === 'function') {
        const f = v.toString().match(/\([	-~]*/g)[0]
        s += `function ${k}${f};`.replace(/=>/g, '')
      }
    }
    return s
  }
}

export function load(app) {
  app.mount()
  window.requestAnimationFrame(() => {
    load(app)
  })
}