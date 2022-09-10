# XFANG JS 

The Modern JavaScript Framework! 

## Installation 

> Development still in progress... 

## Attributes 

### x 

- Tells **XFANG** to render the element 
- Giving the `x` attribute a value will set the text content of the element 

### x-bind 

- Dynamically sets the HTML attributes on an element 
- Accepts the `:` shorthand 

### x-on 

- Listen for browser events on an element 
- Accepts the `@` shorthand

## Integration 

### HTML 

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Framework</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400&display=swap" rel="stylesheet">
  <link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div id="app">
    <h1>
      XFANG
    </h1>
    <p>This button is reactive!</p>
    <button x x-on:click="increment()">{ count }</button>
    <p>This element is bound to a variable!</p>
    <span x>{ message }</span>
    <a x x-bind:href="url">
      Variable URL!
    </a>
  </div>
  <script src="xfang.js" type="module"></script>
  <script src="script.js" type="module"></script>
</body>

</html>
```

### JS 

```js
import { App, load } from 'xfang'

let data = {
  // define values 
  message: 'Hello, World!',
  count: 0,
  url: 'https://github.com/intfract',
}

let methods = {
  // declare functions 
  increment() {
    count++
  },
}

const app = new App(data, methods, false) 
/*
  data: Object (not functions)
  methods: Object (functions)
  all: boolean { 
    true: select all DOM elements, 
    false: default [x] query selector 
  }
*/
load(app)
```