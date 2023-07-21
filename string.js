import * as dv from "devalue";
import superjson from "superjson";

var dudu = "im-the-$hit";

var x = {
  id: 1,
  penis: "long",
};

const xtra = dv.stringify(x);

console.log(dv.parse(xtra));
