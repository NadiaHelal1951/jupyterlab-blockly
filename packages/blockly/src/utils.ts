import * as Blockly from 'blockly';
import { ToolboxDefinition } from 'blockly/core/utils/toolbox';
//import { toolbox } from 'blockly/core/utils';
//toolbox api: { kind: string; contents: [...] } toolbox.d.ts
// Creating a toolbox containing all the main (default) blocks.
//import {x} from './test';
//let TOOLBOX = null
export const openDialogAndGetToolbox = async (): Promise<ToolboxDefinition> => {
  return new Promise(resolve => {
    let x;
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

    // create the dialog title
    const title = document.createElement('h1');
    title.textContent =
      'Enter JSON data please. Press "Default" if you want default toolbox';
    title.style.fontSize = '20px';
    title.style.marginBottom = '10px';
    title.style.textAlign = 'center';

    // add the dialog title to the dialog
    dialog.appendChild(title);

    // create the JSON input box element
    const jsonInput = document.createElement('textarea');
    jsonInput.placeholder = 'Enter JSON data here';
    jsonInput.style.width = '100%';
    jsonInput.style.height = '200px';
    jsonInput.style.borderRadius = '5px';
    jsonInput.style.border = '1px solid #ccc';
    jsonInput.style.padding = '10px';
    jsonInput.style.resize = 'none';

    // add the JSON input box to the dialog
    dialog.appendChild(jsonInput);

    // create the "Save" button
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
    dialog.appendChild(saveButton);

    const defaultButton = document.createElement('button');
    defaultButton.textContent = 'Default';
    defaultButton.style.backgroundColor = '#4CAF50';
    defaultButton.style.borderRadius = '5px';
    defaultButton.style.border = 'none';
    defaultButton.style.color = 'white';
    defaultButton.style.padding = '10px';
    defaultButton.style.cursor = 'pointer';
    defaultButton.style.marginLeft = '5px';
    defaultButton.style.marginTop = '10px';

    // add the "Save" button to the dialog
    dialog.appendChild(defaultButton);

    // create the "Cancel" button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.backgroundColor = '#ccc';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.border = 'none';
    cancelButton.style.color = 'white';
    cancelButton.style.padding = '10px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.marginLeft = '5px';
    cancelButton.style.marginTop = '10px';

    // add the "Cancel" button to the dialog
    dialog.appendChild(cancelButton);

    saveButton.addEventListener('click', () => {
      x = jsonInput.value;
      dialog.close();
      resolve(x);
    });

    defaultButton.addEventListener('click', () => {
      x = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'CATEGORY',
            colour: '330',
            custom: 'VARIABLE',
            name: 'Variables'
          }
        ]
      };
      dialog.close();
      resolve(x);
    });

    cancelButton.addEventListener('click', () => {
      x = null;
      dialog.close();
      resolve(x);
    });
    // add the dialog to the page
    document.body.appendChild(dialog);

    // open the dialog
    dialog.showModal();
    return x;
    //dialog2.close();
  });
};

//var toolbox: Promise<ToolboxDefinition> = openDialogAndGetToolbox();
//var TOOLBOX: ToolboxDefinition = toolbox as unknown as ToolboxDefinition
let z = ''; // define TOOLBOX as a string
export let TOOLBOX = JSON.stringify(
  openDialogAndGetToolbox().then(toolboxValue => {
    z = JSON.stringify(toolboxValue); // set TOOLBOX to the JSON string
    TOOLBOX = z;
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

    const toolboxDiv = document.createElement('div');
    toolboxDiv.textContent = 'say sm' + TOOLBOX;
    toolboxDiv.style.marginBottom = '10px';
    dialog2.appendChild(toolboxDiv);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Test';
    saveButton.style.backgroundColor = '#4CAF50';
    saveButton.style.borderRadius = '5px';
    saveButton.style.border = 'none';
    saveButton.style.color = 'white';
    saveButton.style.padding = '10px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.marginTop = '10px';

    // add the "Save" button to the dialog
    dialog2.appendChild(saveButton);

    document.body.appendChild(dialog2);
    saveButton.addEventListener('click', () => {
      //x = null
      dialog2.close();
      //resolve(x)
    });
    dialog2.showModal();
    //dialog2.close();
  })
);

//TOOLBOX = JSON.stringify(z);
//export {TOOLBOX} ; // export the TOOLBOX constant

//export{TOOLBOX}
//let z = await openDialogAndGetToolbox();

// Declare TOOLBOX as a Promise that will resolve to a ToolboxDefinition
//export const TOOLBOX = openDialogAndGetToolbox() as unknown as ToolboxDefinition;
// Call the function to get the user's input and set the TOOLBOX variable to the resolved value

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
/**function valueOf(TOOLBOX: Blockly.utils.toolbox.ToolboxDefinition): string {
  throw new Error('Function not implemented.');
}**/
