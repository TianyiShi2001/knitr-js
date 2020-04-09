import { parseChunkIter } from "./src/parse";

import * as fs from "fs";

let text = fs.readFileSync("./demo/demo.xmd", "utf-8");
let x = parseChunkIter(text);

for (let chunk of x) {
  console.log(chunk);
}
