import * as Blockly from 'blockly';
//import {openDialogAndGetToolbox} from './load'
import { ToolboxDefinition } from 'blockly/core/utils/toolbox';

let userInput: any;

/**function saveInput() {
  const inputElement = document.getElementById("userInput") as HTMLInputElement;
  userInput = inputElement.value;
  console.log("User Input:", userInput);
}**/

export function test(): Promise<ToolboxDefinition> {
  return new Promise(resolve => {
    const dialog2 = document.createElement('dialog');
    dialog2.style.backgroundColor = 'white';
    dialog2.style.borderRadius = '10px';
    dialog2.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    dialog2.style.position = 'fixed';
    dialog2.style.top = '50%';
    dialog2.style.left = '50%';
    dialog2.style.transform = 'translate(-50%, -50%)';
    dialog2.style.padding = '20px';
    dialog2.style.zIndex = '9999';

    const title2 = document.createElement('h1');
    title2.textContent = 'Test the tools';
    title2.style.fontSize = '20px';
    title2.style.marginBottom = '10px';
    title2.style.textAlign = 'center';
    dialog2.appendChild(title2);

    const userInputDiv = document.createElement('div');
    const userInputLabel = document.createElement('label');
    userInputLabel.textContent = 'Enter your input: ';
    const userInputInput = document.createElement('input');
    userInputInput.type = 'text';
    userInputInput.id = 'userInput';
    userInputInput.name = 'userInput';
    userInputDiv.appendChild(userInputLabel);
    userInputDiv.appendChild(userInputInput);
    userInputDiv.style.marginBottom = '10px';
    dialog2.appendChild(userInputDiv);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.backgroundColor = '#4CAF50';
    saveButton.style.borderRadius = '5px';
    saveButton.style.border = 'none';
    saveButton.style.color = 'white';
    saveButton.style.padding = '10px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.marginTop = '10px';

    // add the "Save" button to the dialog
    dialog2.appendChild(saveButton);

    saveButton.addEventListener('click', async () => {
      await (userInput = (
        document.getElementById('userInput') as HTMLInputElement
      ).value);
      dialog2.close();
      const userInputHeader = document.createElement('h1');
      userInputHeader.textContent = `Your input was: ${userInput}`;
      document.body.appendChild(userInputHeader);
      //let x = { kind: 'categoryToolbox', contents: [{ kind: 'CATEGORY', colour: '330', custom: 'VARIABLE', name: 'Variables' }]};
      resolve(userInput as ToolboxDefinition);
    });
    document.body.appendChild(dialog2);
    dialog2.showModal();
  });
}
export { userInput };
//test();
//export const TOOLBOX = JSON.stringify(TOOL);
//export{TOOLBOX}

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
