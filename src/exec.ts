import { parseChunkIter } from "./parse";
import * as execa from "execa";

function* execChunks(doc) {
  for (let chunk of parseChunkIter(doc)) {
    let srcCode = chunk.code;
    let engine = chunk.execution.engine;
    if (chunk.render.eval) {
      chunk.execution.engine;
    }
  }
}

export async function executeChunk(command, arguments) {
  try {
    const res = await execa(command, arguments);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
