#!/usr/bin/env node

const process = require('node:process');
const fs = require('node:fs/promises');
const path = require('node:path');

const {log, warn, error} = console;
const debug = process.env.NODE_ENV == 'development'
	? console.debug
	: () => {};

function help() {
	let msg = `
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

	`.trim();
	log(msg);
}

async function main(args) {
	if (!args.length) {
		help();
		return 1;
	}
	let src, dst;
	for (let i = 0; i < args.length; i++) {
		let arg = args[i];
		if (!src) {
			src = path.normalize(arg);
		} else if (!dst) {
			dst = path.normalize(arg);
		}
	}
	if (!dst) dst = process.cwd();
	debug(`src:`, src);
	debug(`dst:`, dst);
	debug();

	let readOpts = {encoding: 'utf8', flag: 'r'};
	let stats = await fs.stat(src);
	if (stats.isFile()) {

	} else if (stats.isDirectory()) {
		let tasks = [];
		let files = await fs.readdir(src);
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			if (file == 'package.json') continue;
			file = path.join(src, file);
			debug(`src file:`, file);

			tasks.push(fs.readFile(file, readOpts).then(data => {
				debug(`data:`, data);
			}));
		}
		return await Promise.all(tasks).then(() => {
			log(`Done.`);
			return 0;

		}).catch(err => {
			error(err);
			return 1;
		});
	} else {
		error(`Invalid file type:`, src);
		return 1;
	}
}

main(process.argv.slice(2)).then(process.exit);
