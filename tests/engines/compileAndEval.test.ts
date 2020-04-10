import { ENGINES } from "./engines";

const { clang, gcc } = ENGINES.c;

const c_hello = `\
#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("hello");
   return 0;
}
`;

test("gcc hello.c", () => {
  return gcc(c_hello).then((res) => {
    expect(res.output).toBe("hello");
  });
});
