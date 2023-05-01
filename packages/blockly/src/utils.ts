import * as Blockly from 'blockly';
import { ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { see } from './registry';

export const test = new Promise<ToolboxDefinition>(resolve => {
  let userInput: ToolboxDefinition | null = null;
  const dialog = document.createElement('dialog');
  dialog.style.backgroundColor = 'white';
  dialog.style.borderRadius = '10px';
  dialog.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.padding = '20px';
  dialog.style.zIndex = '9999';

  const title = document.createElement('h1');
  title.textContent = 'Test the tools';
  title.style.fontSize = '20px';
  title.style.marginBottom = '10px';
  title.style.textAlign = 'center';
  dialog.appendChild(title);

  const jsonInput = document.createElement('textarea');
  //jsonInput.placeholder =
  //'Please make sure it follows toolbox API\nE.g.{"kind"{..}"contents"[{..}]};';
  jsonInput.style.width = '95%';
  jsonInput.style.height = '100px';
  jsonInput.style.borderRadius = '10px';
  //jsonInput.style.border = '1px solid #ccc';
  jsonInput.style.backgroundColor = 'white';
  jsonInput.style.padding = '10px';
  dialog.appendChild(jsonInput);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.style.backgroundColor = '#4CAF50';
  saveButton.style.borderRadius = '5px';
  saveButton.style.border = 'none';
  saveButton.style.color = 'white';
  saveButton.style.padding = '10px';
  saveButton.style.cursor = 'pointer';
  saveButton.style.marginTop = '10px';

  dialog.appendChild(saveButton);

  saveButton.addEventListener('click', () => {
    const inputString = jsonInput.value;
    userInput = eval(`(${inputString})`);
    see(userInput);

    dialog.close();
    resolve(userInput);
  });

  document.body.appendChild(dialog);
  dialog.showModal();
});

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
