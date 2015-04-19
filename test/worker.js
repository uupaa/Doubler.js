// Doubler test

onmessage = function(event) {
    self.TEST_DATA = event.data;
    self.TEST_ERROR_MESSAGE = "";

    if (!self.console) {
        self.console = function() {};
        self.console.log = function() {};
        self.console.warn = function() {};
        self.console.error = function() {};
    }

    importScripts("../node_modules/uupaa.codec.js/node_modules/uupaa.hash.js/lib/Hash.js");
    importScripts("../node_modules/uupaa.codec.js/lib/Codec.js");
    importScripts("../node_modules/uupaa.codec.js/lib/Doubler.js");
    importScripts("../node_modules/uupaa.codec.js/lib/MessagePack.js");
    importScripts("../node_modules/uupaa.codec.js/lib/ZLib.js");
    importScripts("../node_modules/uupaa.codec.js/lib/PNG.js");
    importScripts(".././test/wmtools.js");
    importScripts("../lib/Doubler.js");
    importScripts("../release/Doubler.w.min.js");
    importScripts("./testcase.js");

    self.postMessage({ TEST_ERROR_MESSAGE: self.TEST_ERROR_MESSAGE || "" });
};

