import { ENGINES } from "./engines";

const { octave } = ENGINES.octave;

test("octave disp('hello')", () => {
  return octave("disp('hello')").then((res) => {
    expect(res.output).toBe("hello");
  });
});

const { ruby } = ENGINES.ruby;

test("ruby puts hello", () => {
  return ruby("puts 'hello'").then((res) => {
    expect(res.output).toBe("hello");
  });
});

const { sh, bash, csh, dash, ksh, tcsh, zsh } = ENGINES.shell;

test("sh echo hello", () => {
  return sh("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

test("bash echo hello", () => {
  return bash("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

test("csh echo hello", () => {
  return csh("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

test("dash echo hello", () => {
  return dash("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

test("ksh echo hello", () => {
  return ksh("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

test("tcsh echo hello", () => {
  return tcsh("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

test("zsh echo hello", () => {
  return zsh("echo hello").then((res) => {
    expect(res.output).toBe("hello");
  });
});

const { scala } = ENGINES.scala;

test('scala println("hello")', () => {
  return scala('println("hello")').then((res) => {
    expect(res.output).toBe("hello");
  });
});
