(function moduleExporter(moduleName, moduleBody) { // http://git.io/WebModule
   "use strict";

    var alias  = moduleName in GLOBAL ? (moduleName + "_") : moduleName; // switch
    var entity = moduleBody(GLOBAL);

    if (typeof modules !== "undefined") {
        GLOBAL["modules"]["register"](alias, moduleBody, entity["repository"]);
    }
    if (typeof exports !== "undefined") {
        module["exports"] = entity;
    }
    GLOBAL[alias] = entity;

})("Doubler", function moduleBody(global) {

"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
var Doubler = {
    "encode":   Doubler_encode, // Doubler.encode(source:Uint8Array):Uint16Array
    "decode":   Doubler_decode, // Doubler.decode(source:Uint16Array):Uint8Array
    "repository": "https://github.com/uupaa/Doubler.js"
};

// --- implements ------------------------------------------
function Doubler_encode(source) { // @arg Uint8Array - [0xff, 0xff, ...]
                                  // @ret Uint16Array - [0x0040, 0x7fff, ...]
                                  // @desc pack Doubler
//{@dev
    if (!global["BENCHMARK"]) {
        $valid($type(source, "Uint8Array"), Doubler_encode, "source");
    }
//}@dev

    var iz = source.length >> 1 << 1; // byte align -> word align
    var result = new Uint16Array(iz + 2);
    var cursor = 0; // result cursor

    for (var i = 0; i < iz; i += 2) {
        var w = (source[i] << 8) | source[i + 1]; // big-endian

        if (w === 0x0000 || w === 0x0040) {         // encode NULL and esc@pe
            result[cursor++] = 0x0040;
            result[cursor++] = w + 0x8000;
        } else if ((w >= 0xd800 && w <= 0xdfff) ||  // encode SurrogatePairs
                    w >= 0xfffe) {                  // encode BOM
            result[cursor++] = 0x0040;
            result[cursor++] = w - 0x8000;
        } else {
            result[cursor++] = w; // through
        }
    }
    if (source.length % 2) { // tail byte
        result[cursor++] = 0x0040;
        result[cursor++] = source[i] + 0x9000;
    }
    if (result.length !== cursor) {
        return result.subarray(0, cursor);
    }
    return result;
}

function Doubler_decode(source) { // @arg Uint16Array - [0x0040, 0x7fff, ...]
                                  // @ret Uint8Array - [0xff, 0xff, ...]
                                  // @desc unpack Doubler
//{@dev
    if (!global["BENCHMARK"]) {
        $valid($type(source, "Uint16Array"), Doubler_decode, "source");
    }
//}@dev

    var iz = source.length;
    var result = new Uint8Array(iz * 2);
    var cursor = 0; // result cursor

    for (var i = 0; i < iz; ++i) {
        var w = source[i];

        if (w === 0x0040) { // Doubler esc@pe
            var nw = source[++i];

            if (nw === 0x8000 || nw === 0x8040) {   // decode NULL and at-mark
                result[cursor++] = 0x00;
                result[cursor++] = nw - 0x8000;
            } else if ((nw & 0x9000) === 0x9000) {  // decode Tail byte
                result[cursor++] = nw - 0x9000;
            } else {                                // decode SurrogatePairs and BOM
                nw += 0x8000;
                result[cursor++] = nw >> 8;
                result[cursor++] = nw;
            }
        } else {
            result[cursor++] = w >> 8;
            result[cursor++] = w;
        }
    }
    if (result.length !== cursor) {
        return result.subarray(0, cursor);
    }
    return result;
}

// --- validate and assert functions -----------------------
//{@dev
  function $type(obj, type)      { return GLOBAL["Valid"] ? GLOBAL["Valid"].type(obj, type)    : true; }
//function $keys(obj, str)       { return GLOBAL["Valid"] ? GLOBAL["Valid"].keys(obj, str)     : true; }
//function $some(val, str, ig)   { return GLOBAL["Valid"] ? GLOBAL["Valid"].some(val, str, ig) : true; }
//function $args(fn, args)       { if (GLOBAL["Valid"]) { GLOBAL["Valid"].args(fn, args); } }
  function $valid(val, fn, hint) { if (GLOBAL["Valid"]) { GLOBAL["Valid"](val, fn, hint); } }
//}@dev

return Doubler; // return entity

});

