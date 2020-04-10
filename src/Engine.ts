import { options } from "./Options";
import { Chunk } from "./Chunk";
import { executeChunk } from "./exec";
import * as execa from "execa";
import tempfile = require("tempfile");
import * as fs from "fs";

interface Result {
  output: string;
  error: string;
  message?: string;
}

export const ENGINE_ALIASES = {
  js: "javascript",
  ts: "typescript",
  rs: "rust",
  py: "python",
  "c++": "cpp",
  "*": "generic",
};

type Engine = (code: string) => Promise<Result>;

function makeSimpleEngine(command: string, args: string[] | string, message?: string): Engine {
  return async (code) => {
    args = Array.isArray(args) ? args : [args];
    let res = {} as Result;
    res.message = message || `running: ${command} ${args.join(" ")}`;
    args.push(code);
    try {
      const r = await execa(command, args);
      res.output = r.stdout;
    } catch (e) {
      res.error = e.stderr ? e.stderr : e.shortMessage;
    }
    return res;
  };
}

// JS
const eng_node = makeSimpleEngine("node", "-e");
const eng_ts = makeSimpleEngine("ts-node", "-e");
const eng_coffee = makeSimpleEngine("coffee", "-e");
// Other programming languages
const eng_lein = makeSimpleEngine("lein", ["exec", "-ep"]); // The Leiningen engine requires lein-exec plugin.
const eng_groovy = makeSimpleEngine("groovy", "-e");
const eng_octave = makeSimpleEngine("octave", "--eval");
const eng_perl = makeSimpleEngine("perl", "-E");
const eng_python = makeSimpleEngine("python", "-c");
const eng_ruby = makeSimpleEngine("ruby", "-e");
const eng_scala = makeSimpleEngine("scala", "-e");
// Shell
const eng_sh = makeSimpleEngine("sh", "-c");
const eng_bash = makeSimpleEngine("bash", "-c");
const eng_csh = makeSimpleEngine("csh", "-c");
const eng_dash = makeSimpleEngine("dash", "c");
const eng_ksh = makeSimpleEngine("ksh", "-c");
const eng_tcsh = makeSimpleEngine("tcsh", "-c");
const eng_zsh = makeSimpleEngine("zsh", "-c");
// SQL
const eng_mysql = makeSimpleEngine("mysql", "-e");
const eng_psql = makeSimpleEngine("psql", "-c");

function makeSimpleCompiledEngine(command: string, ext: string, buildOpt?: string, outOpt: string | null = "-o"): Engine {
  return async (code) => {
    const src = tempfile(ext);
    const bin = src.split(".").pop();
    fs.writeFileSync(src, code, "utf8");

    let args = [];
    buildOpt && args.push(buildOpt);
    args.push(src);
    outOpt && args.push(outOpt);

    let res = {} as Result;
    try {
      res.message = (await execa(command, args)).stdout; // compiler messagge
      try {
        res.output = (await execa(bin)).stdout; // binary output
      } catch (e) {
        res.error = e.stderr ? e.stderr : e.shortMessage;
      }
    } catch (e) {
      res.error = e.stderr ? e.stderr : e.shortMessage;
    } finally {
      try {
        fs.unlinkSync(src);
        fs.unlinkSync(bin);
      } catch (e) {}
    }
    return res;
  };
}

// C-like
const eng_c_clang = makeSimpleCompiledEngine("clang", "c");
const eng_c_gcc = makeSimpleCompiledEngine("gcc", ".c");
const eng_cpp_clang = makeSimpleCompiledEngine("clang", ".cpp");
const eng_cpp_gpp = makeSimpleCompiledEngine("g++", ".cpp");
// others
const eng_go = makeSimpleCompiledEngine("go", ".go", "build", null);
const eng_rust_rustc = makeSimpleCompiledEngine("rustc", ".rs");

const mapEngines = {
  node: eng_node,
  rustc: eng_rust_rustc,
};

export function defaultEngine(language) {
  const defaultEngines = { bash: "bash", javascript: "node", rust: "rustc", r: "Rscript", python: "python" };
  let options = getOptions();
  return (options.defaultEngines && options.defaultEngines[language]) || defaultEngines[language];
}

const engine2language = {
  node: "javascript",
  cargo: "rust",
};
