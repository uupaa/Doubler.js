(function(global) {
"use strict";

// --- dependency module -----------------------------------
//{@dev
//  This code block will be removed in `$ npm run build-release`. http://git.io/Minify
var Valid = global["Valid"] || require("uupaa.valid.js"); // http://git.io/Valid
//}@dev

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Doubler() {
}

Doubler["repository"] = "https://github.com/uupaa/Doubler.js";
Doubler["encode"] = Doubler_encode; // Doubler.encode(source:ByteArray):WordArray
Doubler["decode"] = Doubler_decode; // Doubler.decode(source:WordArray):ByteArray

// --- implement -------------------------------------------
function Doubler_encode(source) { // @arg ByteArray - [0xff, 0xff, ...]
                                  // @ret WordArray - [0x0040, 0x7fff, ...]
                                  // @desc pack Doubler
//{@dev
    Valid(Valid.type(source, "Array"), Doubler.encode, "source");
//}@dev

    var rv = [], i = 0, iz = source.length >> 1 << 1; // byte align -> word align
    var c = 0;

    for (; i < iz; i += 2) {
        c = ((source[i]     & 0xff) << 8) | // big-endian
             (source[i + 1] & 0xff);

        if (c === 0x0000 || c === 0x0040) {         // encode NULL and esc@pe
            rv.push(0x0040, c + 0x8000);
        } else if ((c >= 0xd800 && c <= 0xdfff) ||  // encode SurrogatePairs
                    c >= 0xfffe) {                  // encode BOM
            rv.push(0x0040, c - 0x8000);
        } else {
            rv.push(c); // through
        }
    }
    if (source.length % 2) { // tail byte
        rv.push(0x0040, (source[i] & 0xff) + 0x9000);
    }
    return rv;
}

function Doubler_decode(source) { // @arg WordArray - [0x0040, 0x7fff, ...]
                                  // @ret ByteArray - [0xff, 0xff, ...]
                                  // @desc unpack Doubler
//{@dev
    Valid(Valid.type(source, "Array"), Doubler.decode, "source");
//}@dev

    var rv = [], c = 0, d = 0, i = 0, iz = source.length;

    for (; i < iz; ++i) {
        c = source[i];

        if (c === 0x0040) { // Doubler esc@pe
            d = source[++i];
            if (d === 0x8000 || d === 0x8040) {     // decode NULL and at-mark
                rv.push(0x00, d - 0x8000);
            } else if ((d & 0x9000) === 0x9000) {   // decode Tail byte
                rv.push(d - 0x9000);
            } else {                                // decode SurrogatePairs and BOM
                d += 0x8000;
                rv.push((d >> 8) & 0xff, d & 0xff);
            }
        } else {
            rv.push((c >> 8) & 0xff, c & 0xff);
        }
    }
    return rv;
}

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = Doubler;
}
global["Doubler" in global ? "Doubler_" : "Doubler"] = Doubler; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom
