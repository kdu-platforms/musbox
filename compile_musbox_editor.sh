#!/bin/bash
set -e

# Compile editor/main.ts into build/editor/main.js and dependencies
npx tsc

# Combine build/editor/main.js and dependencies into website/musbox_editor.js
npx rollup build/editor/main.js \
	--file website/musbox_editor.js \
	--format iife \
	--output.name musbox \
	--context exports \
	--sourcemap \
	--plugin rollup-plugin-sourcemaps \
	--plugin @rollup/plugin-node-resolve

# Minify website/musbox_editor.js into website/musbox_editor.min.js
npx terser \
	website/musbox_editor.js \
	--source-map "content='website/musbox_editor.js.map',url=musbox_editor.min.js.map" \
	-o website/musbox_editor.min.js \
	--compress \
	--mangle \
	--mangle-props regex="/^_.+/;"

# Combine the html and js into a single file for the offline version
sed \
	-e '/INSERT_MUSBOX_SOURCE_HERE/{r website/musbox_editor.min.js' -e 'd' -e '}' \
	website/musbox_offline_template.html \
	> website/musbox_offline.html
