# VSCode 2 Snipmate
Converts VSCode snippets into SnipMate ones.

## Installation
This is a CLI application. Globally install it via NPM.

```sh
npm i -g vscode2snipmate
```

## Usage
```
=== VSCode 2 SnipMate ===
by Satoshi Soma (github.com/amekusa)

Usage:
  vs2sm <input_file> [output_dir]
  vs2sm <input_dir> [output_dir]

  * <input_file> : Snippet file to convert. Must be a JSON.
  * <input_dir>  : Directory of the snippet files to convert.
  * [output_dir] : Output destination. Defaults to CWD.

Examples:
  # Convert a single snippets file
  vs2sm my/snippets/javascript.json output/dir

  # Convert all the snippets file in a directory
  vs2sm my/snippets output/dir

```

## License
MIT

