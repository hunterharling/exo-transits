"use strict";
const FS = require("fs");
let text = FS.readFileSync("./build/service-worker.js").toString();
const start = text.indexOf("blacklist: [");
const end = text.indexOf("\n", start) - 2;
text = text.substring(0, end) + ",/^\\/admin/,/^\\/api/" + text.substring(end);
FS.writeFileSync("./build/service-worker.js", text);