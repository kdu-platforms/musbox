#!/bin/bash
set -e

# Compile player/main.ts into build/player/main.js and dependencies
npx tsc -p tsconfig_player.json

# Combine build/player/main.js and dependencies into website/player/musbox_player.js
npx rollup build/player/main.js \
	--file website/player/musbox_player.js \
	--format iife \
	--output.name musbox \
	--context exports \
	--sourcemap \
	--plugin rollup-plugin-sourcemaps \
	--plugin @rollup/plugin-node-resolve

# Minify website/player/musbox_player.js into website/player/musbox_player.min.js
npx terser \
	website/player/musbox_player.js \
	--source-map "content='website/player/musbox_player.js.map',url=musbox_player.min.js.map" \
	-o website/player/musbox_player.min.js \
	--compress \
	--mangle \
	--mangle-props regex="/^_.+/;"
