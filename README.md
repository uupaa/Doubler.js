=========
Doubler.js
=========

![](https://travis-ci.org/uupaa/Doubler.js.png)

SQLite safe packer.

# Document

- [Doubler.js wiki](https://github.com/uupaa/Doubler.js/wiki/Doubler)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


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

