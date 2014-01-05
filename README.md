Doubler.js
=========

Doubler.js is SQLite safe packer.

# API Document

https://github.com/uupaa/Douber.js/wiki/Douber

# Install, Setup modules

```sh
$ git clone git@github.com:uupaa/Doubler.js.git
$ cd Doubler.js
$ npm install

    npm http GET https://registry.npmjs.org/uupaa.task.js
    npm http 200 https://registry.npmjs.org/uupaa.task.js
    uupaa.task.js@0.8.0 node_modules/uupaa.task.js
```

# Test

```sh
$ npm test

    > uupaa.doubler.js@0.8.0 test /Users/username/path/Douber.js
    > NODE_ENV=production NODE_PATH=lib node --harmony test/index.node.js; open test/index.html

      :
      :
    test success.
    ok.
```

# Double vs Base64 vs HexEncode

## Chrome

| test case         | encode | decode | note     |
|-------------------|--------|--------|----------|
| testBase64_1MB    |   6 ms |  16 ms | use btoa |
| testDoubler_1MB   |  10 ms |  32 ms |          |
| testHexEncode_1MB | 230 ms |        |          |
| testBase64_5MB    |  30 ms |  75 ms | use atob |
| testDoubler_5MB   |  66 ms | 167 ms |          |
| testHexEncode_5MB | 845 ms |        |          |

## Node.js

| test case         |  encode | decode | note    |
|-------------------|---------|--------|---------|
| testBase64_1MB    |  324 ms | 162 ms |         |
| testDoubler_1MB   |   30 ms |  63 ms |         |
| testHexEncode_1MB |  201 ms |        |         |
| testBase64_5MB    | 1581 ms | 672 ms |         |
| testDoubler_5MB   |  147 ms | 322 ms |         |
| testHexEncode_5MB |  860 ms |        |         |

Node.js has not global.atob and global.btoa functions.

