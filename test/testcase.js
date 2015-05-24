var ModuleTestDoubler = (function(global) {

global["BENCHMARK"] = false;

var test = new Test("Doubler", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    }).add([
        testDoubler_basic,
        testDoubler_hasTailByte,
        testDoubler_escape,
      //testBase64_10Byte
        testBase64_100KB,
        testDoubler_100KB,
        testBase64_1MB,
        testDoubler_1MB,
        testBase64_5MB,
        testDoubler_5MB,
    ]);

if (IN_BROWSER || IN_NW) {
    test.add([
        // browser and node-webkit test
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}

// --- test cases ------------------------------------------
function testDoubler_basic(test, pass, miss) {

    var u8     = new Uint8Array([0x42, 0x44, 0x46, 0x48, 0x4a]);
    var u16    = Doubler.encode( u8 );
    var result = Doubler.decode( u16 );

    if (Test.likeArray(u8, result)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDoubler_hasTailByte(test, pass, miss) {

    var byteString = "\u0000\u0001\u0002\u0003\u0004\u0005\u0020\u0021\u0032\u0033\u0048\u00fd\u00fe\u00ff";
        byteString += "\u00ff"; // add tail byte

    var u8 = Codec.StringToUint8Array( byteString );
    var u16 = Doubler.encode( u8 );
    var result = Doubler.decode( u16 );

    if (Test.likeArray(u8, result)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDoubler_escape(test, pass, miss) {

    var u8 = new Uint8Array([0x00, 0x00,  // -> 0x0000 (NULL)
                             0x00, 0x20,  // -> 0x0020 (0x20)
                             0xff, 0xfe,  // -> 0xfffe (BOM)
                             0xff, 0xff,  // -> 0xffff (BOM)
                             0x00, 0x00,  // -> NULL
                             0x00, 0x20,  // -> 0x20
                             0xd8, 0x00,  // -> 0xd800 (SurrogatePairs)
                             0xdf, 0xff]);// -> 0xdfff (SurrogatePairs)
    var u16    = Doubler.encode( u8 );
    var result = Doubler.decode( u16 );

    if (Test.likeArray(u8, result)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testBase64_10Byte(test, pass, miss) {
    var KB = 1024;
    var obj1 = _encodeBase64( 10 );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_10Byte" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.b64.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
function testBase64_100KB(test, pass, miss) {
    var KB = 1024;
    var obj1 = _encodeBase64( 100 * KB );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_100KB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.b64.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
function testDoubler_100KB(test, pass, miss) {

    var KB = 1024;
    var obj1 = _encodeDoubler( 100 * KB );
    var obj2 = _decodeDoubler( obj1 );

    console.log("testDoubler_100KB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.u16.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testBase64_1MB(test, pass, miss) {

    var MB = 1024 * 1024;
    var obj1 = _encodeBase64( 1 * MB );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_1MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.b64.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
function testDoubler_1MB(test, pass, miss) {

    var MB = 1024 * 1024;
    var obj1 = _encodeDoubler( 1 * MB );
    var obj2 = _decodeDoubler( obj1 );

    console.log("testDoubler_1MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.u16.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testBase64_5MB(test, pass, miss) {

    var MB = 1024 * 1024;
    var obj1 = _encodeBase64( 5 * MB );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_5MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.b64.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}
function testDoubler_5MB(test, pass, miss) {

    var MB = 1024 * 1024;
    var obj1 = _encodeDoubler( 5 * MB );
    var obj2 = _decodeDoubler( obj1 );

    console.log("testDoubler_5MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms" +
                ", words: " + ((obj1.u16.length / 1024) | 0) + " k");
    if (Test.likeArray(obj1.u8, obj2.u8)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function testDoublerStorage(test, pass, miss) {

    var key = "testDoublerStorage";
    var u8 = new Uint8Array([0x00, 0x01,
                             0x02, 0x03,
                             0x04, 0x05,
                             0x09, 0x20,
                             0x21, 0x32,
                             0x33, 0x48,
                             0xfd, 0xfe,
                             0xff, 0x00]);

    localStorage.setItem(key, Codec.Uint8ArrayToString( Doubler.encode( u8 )));

    var result = Doubler.decode( Codec.StringToUint16Array( localStorage.getItem(key) || ""));

    localStorage.removeItem(key);

    if (Test.likeArray(u8, result)) {
        test.done(pass());
    } else {
        test.done(miss());
    }
}

function _encodeDoubler(size) {
    var u8  = _makeRandomSource(size);
    var now = Date.now();
    var u16 = Doubler.encode( u8 );

    return { elapsedTime: Date.now() - now, u8: u8, u16: u16 };
}
function _decodeDoubler(obj) {
    var now = Date.now();
    var u8  = Doubler.decode( obj.u16 );

    return { elapsedTime: Date.now() - now, u8: u8 };
}

function _encodeBase64(size) {
    var u8  = _makeRandomSource(size);
    var str = Codec.Uint8ArrayToString( u8 );
    var now = Date.now();
    var b64 = Codec.Base64.btoa( str );

    return { elapsedTime: Date.now() - now, u8: u8, b64: b64 };
}
function _decodeBase64(obj) {
    var now = Date.now();
    var str = Codec.Base64.atob( obj.b64 );
    var elapsedTime = Date.now() - now;
    var u8 = Codec.StringToUint8Array( str );

    return { elapsedTime: elapsedTime, u8: u8 };
}

function _makeRandomSource(length) { // @arg Number:
                                     // @ret Uint8Array:
    var source = new Uint8Array(length), value = 0;

    for (var i = 0; i < length; ++i) {
        source[i] = Math.floor(Math.random() * 256);
    }
    return source;
}

return test.run();

})(GLOBAL);

