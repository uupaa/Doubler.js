## Doubler.js [![Build Status](https://travis-ci.org/uupaa/Doubler.js.png)](http://travis-ci.org/uupaa/Doubler.js)

[![npm](https://nodei.co/npm/uupaa.doubler.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.doubler.js/)

SQLite safe packer.

## Document

- [Doubler.js wiki](https://github.com/uupaa/Doubler.js/wiki/Doubler)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Browser

```js
<script src="lib/Doubler.js">
<script>
// for Browser
console.log( Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
</script>
```

### WebWorkers

```js
importScripts("lib/Doubler.js");

console.log( Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
```

### Node.js

```js
var Doubler = require("lib/Doubler.js");

console.log( Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
```

