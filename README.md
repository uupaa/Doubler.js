# Doubler.js [![Build Status](https://travis-ci.org/uupaa/Doubler.js.svg)](https://travis-ci.org/uupaa/Doubler.js)

[![npm](https://nodei.co/npm/uupaa.doubler.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.doubler.js/)

SQLite safe packer.

## Document

- Doubler.js made of [WebModule](https://github.com/uupaa/WebModule).
- [Spec](https://github.com/uupaa/Doubler.js/wiki/Doubler)

## Browser and NW.js(node-webkit)

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/Doubler.js"></script>
<script>
console.log( WebModule.Doubler.encode([0x42, 0x44, 0x46, 0x48, 0x4a]) );
    ...
</script>
```

## WebWorkers

```js
importScripts("<module-dir>lib/WebModule.js");
importScripts("<module-dir>lib/Doubler.js");

```

## Node.js

```js
require("<module-dir>lib/WebModule.js");
require("<module-dir>lib/Doubler.js");

```

