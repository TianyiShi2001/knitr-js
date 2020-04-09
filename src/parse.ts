import { defaultEngine } from "./engines";
import { Chunk } from "./Chunk";

export function* parseChunkIter(doc: string) {
  let i = 0;
  for (let chunkText of doc.matchAll(/\n```\{(.*?)\}\n(.*?)```\n/gs)) {
    let chunk = parseChunk(chunkText[1], chunkText[2]);
    chunk.position = [chunkText.index, chunkText.index + chunkText[0].length];
    if (!chunk.label) chunk.label = `unnamed-chunk-${i++}`;
    yield chunk;
  }
}

function parseChunk(header: string, code: string): Chunk {
  let chunk = parseChunkHeader(header);
  chunk.code = code;
  return chunk;
}

function parseChunkHeader(header): Chunk {
  let chunk = new Chunk();
  let [_, language, engine, label, customOptions] = header.match(/(^[\w\d_-]+)(?:\((\S+?)\))?(?: ([\w\d_-]+))?(?:, ?(.*?))?$/);

  if (customOptions) {
    customOptions = parseCustomOptions(customOptions);
    Object.keys(customOptions).forEach((k) => {
      chunk.render[k] = customOptions[k];
    });
  }

  chunk.execution.language = language;
  chunk.execution.engine = engine ? engine : defaultEngine(language);
  chunk.label = label;
  return chunk;
}

function parseCustomOptions(params: string) {
  params = params.replace(/=/g, ":").replace(/TRUE/gi, "true").replace(/FALSE/gi, "false");
  params = eval("({" + params + "});");
  return params;
}
