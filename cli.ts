import tempfile = require("tempfile");
import * as fs from "fs";

let f = tempfile(".txt");
fs.writeFileSync(f, "I need dark sex", "utf8");
let content = fs.readFileSync(f, "utf8");
console.log(f);
console.log(content);
try {
  fs.unlinkSync(f);
  fs.unlinkSync(f);
} catch (error) {}
