import { ENGINES } from "./engines";

const { clang, gcc } = ENGINES.c;
const { go } = ENGINES.go;

const c_hello = `\
#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("hello");
   return 0;
}
`;

gcc(c_hello).then(console.log).catch(console.error);
clang(c_hello).then(console.log).catch(console.error);
go();

const go_hello = `\
package main
import "fmt"
func main() {
    fmt.Println("hello")
}
`;

go(go_hello).then(console.log).catch(console.error);
