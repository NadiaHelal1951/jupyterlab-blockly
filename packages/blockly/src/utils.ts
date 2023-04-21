import * as Blockly from 'blockly';
//import { toolbox } from 'blockly/core/utils';
//toolbox api: { kind: string; contents: [...] } toolbox.d.ts
// Creating a toolbox containing all the main (default) blocks.
import x from './test';

export const TOOLBOX = x;

// Defining a Blockly Theme in accordance with the current JupyterLab Theme.
const jupyterlab_theme = Blockly.Theme.defineTheme('jupyterlab', {
  name: 'JupyterLab Blockly',
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: 'var(--jp-layout-color0)',
    toolboxBackgroundColour: 'var(--jp-layout-color2)',
    toolboxForegroundColour: 'var(--jp-ui-font-color0)',
    flyoutBackgroundColour: 'var(--jp-border-color2)',
    flyoutForegroundColour: 'var(--jp-layout-color3)',
    flyoutOpacity: 1,
    scrollbarColour: 'var(--jp-border-color0)',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: 'var(--jp-scrollbar-background-color)'
  },
  fontStyle: {
    family: 'var(--jp-ui-font-family)'
  }
});

export const THEME: Blockly.Theme = jupyterlab_theme;
