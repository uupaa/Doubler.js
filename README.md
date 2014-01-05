Doubler.js
=========

Doubler.js is SQLite safe packer.

# API Document

https://github.com/uupaa/Doubler.js/wiki/Doubler

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

    > uupaa.doubler.js@0.8.0 test /Users/username/path/Doubler.js
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

| test case         |  encode | decode | note       |
|-------------------|---------|--------|------------|
| testBase64_1MB    |   18 ms |   5 ms | use Buffer |
| testDoubler_1MB   |   34 ms |  78 ms |            |
| testHexEncode_1MB |  233 ms |        |            |
| testBase64_5MB    |   92 ms |  36 ms | use Buffer |
| testDoubler_5MB   |  144 ms | 338 ms |            |
| testHexEncode_5MB |  980 ms |        |            |

Node.js has not global.atob and global.btoa functions.

