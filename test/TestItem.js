// --- define ----------------------------------------------
// --- variable --------------------------------------------
var test = new UnitTest([
        testDoubler,
    ]);

// --- interface -------------------------------------------
// --- implement -------------------------------------------
function testDoubler(next) {

    var source = "\u3042\u3044\u3046\u3048\u304a"; // <japanese> A I U E O </japanese>
    var doubler = Doubler.encode( Binary.BinaryStringToByteArray( source ) );
    var revert = Binary.ByteArrayToBinaryString( Doubler.decode(doubler) );

    if (source === revert) {
        console.log("testDoubler ok");
        next && next.pass();
    } else {
        console.log("testDoubler ng");
        next && next.miss();
    }
}

// --- export ----------------------------------------------

// --- run ----------------------------------------------
function _init() {
    // create <input> buttons.
    if (typeof document !== "undefined") {
        test.names().forEach(function(name) {
            //  <input type="button" onclick="testX()" value="testX()" /> node.
            document.body.appendChild(
                _createNode("input", {
                    type: "button",
                    value: name + "()",
                    onclick: name + "()" }));
        });
        window.addEventListener("error", function(message, lineno, filename) {
            document.body.style.backgroundColor = "red";
        });
    }
    // run
    test.run(function(err) {
        if (typeof document !== "undefined") {
            document.body.style.backgroundColor = err ? "red" : "lime";
        } else {
            // console color
            var RED    = '\u001b[31m';
            var YELLOW = '\u001b[33m';
            var GREEN  = '\u001b[32m';
            var CLR    = '\u001b[0m';

            if (err) {
                console.log(RED + "error." + CLR);
            } else {
                console.log(GREEN + "ok." + CLR);
            }
        }
    });

    function _createNode(name, attrs) {
        var node = document.createElement(name);

        for (var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
        return node;
    }
}

if (this.self) {
    this.self.addEventListener("load", _init);
} else {
    _init();
}

