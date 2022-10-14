#!/bin/bash
set -e

# Compile synth/synth.ts into build/synth/synth.js and dependencies
npx tsc -p tsconfig_synth_only.json

# Combine build/synth/synth.js and dependencies into website/musbox_synth.js
npx rollup build/synth/synth.js \
	--file website/musbox_synth.js \
	--format iife \
	--output.name musbox \
	--context exports \
	--sourcemap \
	--plugin rollup-plugin-sourcemaps \
	--plugin @rollup/plugin-node-resolve

# Minify website/musbox_synth.js into website/musbox_synth.min.js
npx terser \
	website/musbox_synth.js \
	--source-map "content='website/musbox_synth.js.map',url=musbox_synth.min.js.map" \
	-o website/musbox_synth.min.js \
	--compress \
	--mangle \
	--mangle-props regex="/^_.+/;"
