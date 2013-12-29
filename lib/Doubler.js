// @name: Doubler.js

(function(global) {

// --- define ----------------------------------------------
// --- variable --------------------------------------------
// --- interface -------------------------------------------
function Doubler() { // @help: Doubler
                     // @desc: SQLite safe packer
}
Doubler.name = "Doubler";
Doubler.repository = "https://github.com/uupaa/Doubler.js";
Doubler.encode = Doubler_encode; // Doubler.encode(source:Uint8ByteArray):Uint16DoublerPackedDataArray
Doubler.decode = Doubler_decode; // Doubler.decode(source:Uint16DoublerPackedDataArray):Uint8ByteArray

// --- implement -------------------------------------------
function Doubler_encode(source) { // @arg Uint8ByteArray: [0xff, 0xff, ...]
                                  // @ret Uint16DoublerPackedDataArray: [0x0020, ...]
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

        if (c === 0x0000) {                         // encode NULL
            rv.push(0x0020, 0x8000);
        } else if (c === 0x0020) {                  // encode 0x20
            rv.push(0x0020, 0x8020);
        } else if ((c >= 0xd800 && c <= 0xdfff) ||  // encode SurrogatePairs
                    c >= 0xfffe) {                  // encode BOM
            rv.push(0x0020, c - 0x8000);
        } else {
            rv.push(c);
        }
    }
    if (source.length % 2) { // tail byte
        rv.push(0x0020, (source[i] & 0xff) + 0x9000);
    }
    return rv;
}

function Doubler_decode(source) { // @arg Uint16DoublerPackedDataArray: [0x0020, ...]
                                  // @ret Uint8ByteArray: [0xff, 0xff, ...]
                                  // @help: Doubler.decode
                                  // @desc: unpack Doubler
//{@assert
    _if(!Array.isArray(source), "invalid Doubler.decode(source)");
//}@assert

    var rv = [], c = 0, d = 0, i = 0, iz = source.length;

    for (; i < iz; ++i) {
        c = source[i];

        if (c === 0x0020) { // Doubler escaped
            d = source[++i];
            if (d === 0x8000) {                     // decode NULL
                rv.push(0x00, 0x00);
            } else if (d === 0x8020) {              // decode 0x20
                rv.push(0x00, 0x20);
            } else if ((d & 0x9000) === 0x9000) {   // decode Tail byte
                rv.push(d & 0xff);
            } else {                                // decode SurrogatePairs and BOM
                rv.push(((d >> 8) & 0xff) + 0x80, d & 0xff);
            }
        } else {
            rv.push((c >> 8) & 0xff, c & 0xff); // unpack UTF16 -> Uint8 2byte
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
if (global.process) { // node.js
    module.exports = Doubler;
}
global.Doubler = Doubler;

})(this.self || global);

