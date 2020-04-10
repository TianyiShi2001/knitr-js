let x: { [p: string]: any } = { a: "b", c: { a: "sex", v: "av" } };
x.d = [x.a, x.c];
console.log(x);
