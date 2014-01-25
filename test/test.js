var test = new Test().add([
        testDoublerBasic,
        testDoublerHasTailByte,
        testDoublerEscape,
        testBase64_100KB,
        testDoubler_100KB,
        testHexEncode_100KB,
        testBase64_1MB,
        testDoubler_1MB,
        testHexEncode_1MB,
        testBase64_5MB,
        testDoubler_5MB,
        testHexEncode_5MB,
    ]);

if (typeof document !== "undefined" && this.localStorage) {
    test.add([
        testDoublerStorage,
    ]);
}
test.run().worker(function(err, test) {
    if (!err && typeof Doubler_ !== "undefined") {
        Doubler = Doubler_;
        new Test(test).run().worker();
    }
});


function testDoublerBasic(next) {

    var byteArray = [0x42, 0x44, 0x46, 0x48, 0x4a];
    var wordArray = Doubler.encode( byteArray );
    var byteArray2 = Doubler.decode( wordArray );

    if (byteArray.join(",") === byteArray2.join(",")) {
        console.log("testDoublerBasic ok");
        next && next.pass();
    } else {
        console.log("testDoublerBasic ng");
        next && next.miss();
    }
}

function testDoublerHasTailByte(next) {

    var byteString = "\u0000\u0001\u0002\u0003\u0004\u0005\u0020\u0021\u0032\u0033\u0048\u00fd\u00fe\u00ff";
        byteString += "\u00ff"; // add tail byte

    var byteArray = ByteArray.fromString( byteString );
    var wordArray = Doubler.encode( byteArray );
    var byteArray2 = Doubler.decode( wordArray );

    if (byteArray.join(",") === byteArray2.join(",")) {
        console.log("testDoublerHasTailByte ok");
        next && next.pass();
    } else {
        console.log("testDoublerHasTailByte ng");
        next && next.miss();
    }
}

function testDoublerEscape(next) {

    var byteArray = [0x00, 0x00,  // -> 0x0000 (NULL)
                     0x00, 0x20,  // -> 0x0020 (0x20)
                     0xff, 0xfe,  // -> 0xfffe (BOM)
                     0xff, 0xff,  // -> 0xffff (BOM)
                     0x00, 0x00,  // -> NULL
                     0x00, 0x20,  // -> 0x20
                     0xd8, 0x00,  // -> 0xd800 (SurrogatePairs)
                     0xdf, 0xff]; // -> 0xdfff (SurrogatePairs)
    var wordArray = Doubler.encode( byteArray );
    var byteArray2 = Doubler.decode( wordArray );

    if (byteArray.join(",") === byteArray2.join(",")) {
        console.log("testDoublerEscape ok");
        next && next.pass();
    } else {
        console.log("testDoublerEscape ng");
        next && next.miss();
    }
}

function testBase64_100KB(next) {

    var KB = 1024;
    var obj1 = _encodeBase64( 100 * KB );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_100KB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms");
    next && next.pass();
}
function testDoubler_100KB(next) {

    var KB = 1024;
    var obj1 = _encodeDoubler( 100 * KB );
    var obj2 = _decodeDoubler( obj1 );

    console.log("testDoubler_100KB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms");
    next && next.pass();
}
function testHexEncode_100KB(next) {

    var KB = 1024;
    var obj1 = _encodeHexEncode( 100 * KB );

    console.log("testHexEncode_100KB" +
                ", encode: " + obj1.elapsedTime + " ms");
    next && next.pass();
}


function testBase64_1MB(next) {

    var MB = 1024 * 1024;
    var obj1 = _encodeBase64( 1 * MB );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_1MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms");
    next && next.pass();
}
function testDoubler_1MB(next) {

    var MB = 1024 * 1024;
    var obj1 = _encodeDoubler( 1 * MB );
    var obj2 = _decodeDoubler( obj1 );

    console.log("testDoubler_1MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms");
    next && next.pass();
}
function testHexEncode_1MB(next) {

    var MB = 1024 * 1024;
    var obj1 = _encodeHexEncode( 1 * MB );

    console.log("testHexEncode_1MB" +
                ", encode: " + obj1.elapsedTime + " ms");
    next && next.pass();
}


function testBase64_5MB(next) {

    var MB = 1024 * 1024;
    var obj1 = _encodeBase64( 5 * MB );
    var obj2 = _decodeBase64( obj1 );

    console.log("testBase64_5MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms");
    next && next.pass();
}
function testDoubler_5MB(next) {

    var MB = 1024 * 1024;
    var obj1 = _encodeDoubler( 5 * MB );
    var obj2 = _decodeDoubler( obj1 );

    console.log("testDoubler_5MB" +
                ", encode: " + obj1.elapsedTime + " ms" +
                ", decode: " + obj2.elapsedTime + " ms");
    next && next.pass();
}
function testHexEncode_5MB(next) {

    var MB = 1024 * 1024;
    var obj1 = _encodeHexEncode( 5 * MB );

    console.log("testHexEncode_5MB" +
                ", encode: " + obj1.elapsedTime + " ms");
    next && next.pass();
}

function testDoublerStorage(next) {

    var key = "testDoublerStorage";
    var byteArray = [0x00, 0x01,
                     0x02, 0x03,
                     0x04, 0x05,
                     0x09, 0x20,
                     0x21, 0x32,
                     0x33, 0x48,
                     0xfd, 0xfe,
                     0xff, 0x00];

    localStorage.setItem(key, WordArray.toString( Doubler.encode( byteArray )));

    var byteArray2 = Doubler.decode( WordArray.fromString( localStorage.getItem(key) || "" ));

    localStorage.removeItem(key);

    if (byteArray.join(",") === byteArray2.join(",")) {
        console.log("testDoublerStorage ok");
        next && next.pass();
    } else {
        console.log("testDoublerStorage ng");
        next && next.miss();
    }
}

function _encodeDoubler(size) {
    var byteArray = _makeRandomSource(size);
    var now = Date.now();
    var wordArray = Doubler.encode( byteArray );

    return { elapsedTime: Date.now() - now, wordArray: wordArray };
}

function _decodeDoubler(obj) {
    var now = Date.now();
    var byteArray = Doubler.decode( obj.wordArray );

    return { elapsedTime: Date.now() - now };
}

function _encodeBase64(size) {
    var byteArray = _makeRandomSource(size);
    var byteString = ByteArray.toString( byteArray );
    var now = Date.now();
    var base64String = Base64.btoa( byteString );

    return { elapsedTime: Date.now() - now, base64String: base64String };
}

function _decodeBase64(obj) {
    var now = Date.now();
    var byteString = Base64.atob( obj.base64String );
    var elapsedTime = Date.now() - now;
    var byteArray = ByteArray.fromString( byteString );

    return { elapsedTime: elapsedTime };
}

function _encodeHexEncode(size) {
    var byteArray = _makeRandomSource(size);
    var now = Date.now();
    var hexEncode = ByteArray.toHexEncode( byteArray );

    return { elapsedTime: Date.now() - now, hexEncode: hexEncode };
}



function _makeRandomSource(length) { // @arg Number:
                                     // @ret ByteArray:
    var source = [], value = 0;

    for (var i = 0; i < length; ++i) {
        value = Math.floor(Math.random() * 256);
        source.push(value);
    }
    return source;
}

