Doubler.js
=========

SQLite safe packer.

# Document

- https://github.com/uupaa/Doubler.js/wiki/Doubler

and 

- https://github.com/uupaa/WebModule and [slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
- https://github.com/uupaa/Help.js and [slide](http://uupaa.github.io/Slide/slide/Help.js/index.html)

# How to use

```js
<script src="lib/Doubler.js">
<script>
// for Browser
console.log( Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
</script>
```

```js
// for WebWorkers
importScripts("lib/Doubler.js");

console.log( Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
```

```js
// for Node.js
var Doubler = require("lib/Doubler.js");

console.log( Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
```

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/Doubler.js.git
    $ cd Doubler.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`

