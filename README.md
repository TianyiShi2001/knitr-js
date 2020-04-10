# knit-js and xmd

[![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/emersion/stability-badges#experimental)

**knit-js** and **xmd** are implementations of R's **[knitr](http://yihui.name/knitr/)** and **[R Markdown]** in Node.js.

## What does knit-js Do

- execute code chunks in `.xmd` files and generate output with customizable behaviour
- compute and renders javascript code snippets
- render `.xmd` into `.md`, then uses `pandoc` to generate various output formats, including pdf, html, docx

