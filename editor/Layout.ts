import {HTML} from "imperative-html/dist/esm/elements-strict";
import {ColorConfig} from "./ColorConfig";

export class Layout {
	private static readonly _layoutMap: {[K: string]: string} = {
		"small": "",
		"long": `\
			/* long layout */
			@media (min-width: 711px) {
				#musboxEditorContainer {
					max-width: initial;
					height: 100vh;
				}
				.musboxEditor {
					width: 100%;
					height: 100vh;
					grid-template-columns: minmax(0, 1fr) 390px; /* minmax(0, 1fr) min-content; Chrome 80 grid layout regression. https://bugs.chromium.org/p/chromium/issues/detail?id=1050307 */
					grid-template-rows: minmax(481px, 1fr) minmax(0, min-content);
					grid-template-areas: "pattern-area settings-area" "track-area track-area";
				}
				.musboxEditor .pattern-area {
					width: 100%;
					height: 100%;
				}
				.musboxEditor .track-area {
					width: 100%;
					display: flex;
					flex-direction: column;
				}
				.musboxEditor .trackAndMuteContainer {
					width: 100%;
					min-height: 0;
					flex: 1;
					overflow: auto;
				}
				.musboxEditor .instrument-settings-area {
					overflow-y: auto;
					position: relative;
				}
				.musboxEditor .instrument-settings-area > .editor-controls {
					position: absolute;
					width: 100%;
				}
				.musboxEditor .song-settings-area {
					overflow-y: auto;
				}
				
				.musboxEditor .settings-area {
					width: 390px;
					grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
					grid-template-rows: auto auto auto minmax(0, 1fr);
					grid-template-areas:
						"instrument-settings-area version-area"
						"instrument-settings-area play-pause-area"
						"instrument-settings-area menu-area"
						"instrument-settings-area song-settings-area";
				}
				
				.musboxEditor .barScrollBar {
					display: none;
				}
				.musboxEditor .trackContainer {
					overflow: visible;
				}
				.musboxEditor .trackAndMuteContainer {
					scrollbar-width: auto;
					scrollbar-color: ${ColorConfig.uiWidgetBackground} ${ColorConfig.editorBackground};
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar {
					width: 20px;
					height: 20px;
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar-track {
					background: ${ColorConfig.editorBackground};
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar-thumb {
					background-color: ${ColorConfig.uiWidgetBackground};
					border: 3px solid ${ColorConfig.editorBackground};
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar-corner {
					background-color: ${ColorConfig.editorBackground};
				}
			}
		`,
		"tall": `\
			/* tall layout */
			@media (min-width: 711px) {
				#musboxEditorContainer {
					max-width: initial;
					height: 100vh;
				}
				.musboxEditor {
					width: 100%;
					height: 100vh;
					grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 192px;
					grid-template-rows: 1fr;
					grid-template-areas: "track-area pattern-area settings-area";
				}
				.musboxEditor .pattern-area {
					width: 100%;
					height: 100%;
				}
				.musboxEditor .track-area {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
				.musboxEditor .trackAndMuteContainer {
					width: 100%;
					min-height: 0;
					flex: 0;
					overflow: auto;
					flex-basis: initial;
					flex-grow: 0;
				}
				.musboxEditor .instrument-settings-area > .editor-controls {
					position: absolute;
					width: 100%;
				}
				
				.musboxEditor .settings-area {
					width: 192px;
					position: relative;
					overflow-y: auto;
					grid-template-columns: minmax(0, 1fr);
					grid-template-rows: auto auto auto auto minmax(0, 1fr);
					grid-template-areas:
						"version-area"
						"play-pause-area"
						"menu-area"
						"song-settings-area"
						"instrument-settings-area";
				}
				.musboxEditor .version-area {
					position: sticky;
					top: 0;
					z-index: 1;
					background: ${ColorConfig.editorBackground};
				}
				.musboxEditor .play-pause-area {
					position: sticky;
					top: 22px;
					z-index: 1;
					background: ${ColorConfig.editorBackground};
				}
				.musboxEditor .menu-area {
					position: sticky;
					top: 82px;
					z-index: 1;
					background: ${ColorConfig.editorBackground};
				}
				
				.musboxEditor .barScrollBar {
					display: none;
				}
				.musboxEditor .trackContainer {
					overflow: visible;
				}
				.musboxEditor .trackAndMuteContainer {
					scrollbar-width: auto;
					scrollbar-color: ${ColorConfig.uiWidgetBackground} ${ColorConfig.editorBackground};
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar {
					width: 20px;
					height: 20px;
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar-track {
					background: ${ColorConfig.editorBackground};
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar-thumb {
					background-color: ${ColorConfig.uiWidgetBackground};
					border: 3px solid ${ColorConfig.editorBackground};
				}
				.musboxEditor .trackAndMuteContainer::-webkit-scrollbar-corner {
					background-color: ${ColorConfig.editorBackground};
				}
			}
		`,
	}
	
	private static readonly _styleElement: HTMLStyleElement = document.head.appendChild(HTML.style({type: "text/css"}));
	
	public static setLayout(layout: string): void {
		this._styleElement.textContent = this._layoutMap[layout];
	}
}
