const msg = '{"name":"John", "age":"22"}';
var JSONB = require("json-buffer");

var jsonObj = JSON.parse(msg);
console.log(jsonObj);

var jsonObj2 = JSONB.parse(msg);
console.log(jsonObj2);

// convert JSON object to String
var jsonStr = JSON.stringify(jsonObj);
console.log(jsonStr);

var jsonStr2 = JSONB.stringify(jsonObj);
console.log(jsonStr2);

// read json string to Buffer
const buf = JSONB.stringify(Buffer.from(jsonStr));
console.log(JSONB.parse(buf));

const buf2 = JSON.stringify(Buffer.from(jsonStr));

console.log(JSON.parse(buf2));
