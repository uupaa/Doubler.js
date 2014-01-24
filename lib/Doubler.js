// @name: Doubler.js

(function(global) {

// --- variable --------------------------------------------
var inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Doubler() { // @help: Doubler
                     // @desc: SQLite safe packer
}
Doubler["name"] = "Doubler";
Doubler["repository"] = "https://github.com/uupaa/Doubler.js";
Doubler["encode"] = Doubler_encode; // Doubler.encode(source:ByteArray):WordArray
Doubler["decode"] = Doubler_decode; // Doubler.decode(source:WordArray):ByteArray

// --- implement -------------------------------------------
function Doubler_encode(source) { // @arg ByteArray: [0xff, 0xff, ...]
                                  // @ret WordArray: [0x0040, 0x7fff, ...]
                                  // @help: Doubler.encode
                                  // @desc: pack Doubler
//{@assert
    _if(!Array.isArray(source), "invalid Doubler.encode(source)");
//}@assert

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

function Doubler_decode(source) { // @arg WordArray: [0x0040, 0x7fff, ...]
                                  // @ret ByteArray: [0xff, 0xff, ...]
                                  // @help: Doubler.decode
                                  // @desc: unpack Doubler
//{@assert
    _if(!Array.isArray(source), "invalid Doubler.decode(source)");
//}@assert

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

//{@assert
function _if(booleanValue, errorMessageString) {
    if (booleanValue) {
        throw new Error(errorMessageString);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (inNode) {
    module["exports"] = Doubler;
}
//}@node
global["Doubler"] ? (global["Doubler_"] = Doubler) // already exsists
                  : (global["Doubler"]  = Doubler);

})(this.self || global);

