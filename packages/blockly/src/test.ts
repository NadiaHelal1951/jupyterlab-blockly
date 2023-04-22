//var x
export function createJsonInputBox() {
  let x = null;
  // create the dialog
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

  // add the dialog to the page
  document.body.appendChild(dialog);

  // open the dialog
  dialog.showModal();

  //return new Promise((resolve, reject) => {
  // add an event listener to the "Save" button
  saveButton.addEventListener('click', () => {
    // get the JSON data from the input box
    x = jsonInput.value;

    // resolve the promise with the jsonData
    //export{x};
    //resolve(jsonData);

    // close the dialog
    dialog.close();
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
  });

  // add an event listener to the "Cancel" button
  cancelButton.addEventListener('click', () => {
    // reject the promise with an error message
    //reject(new Error('User canceled input'));

    // close the dialog
    dialog.close();
  });
  return x;
  //});
}
/**export const openDialogAndGetToolbox = async (): Promise<ToolboxDefinition> => {
  return new Promise((resolve) => {
    let x
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
    title.textContent = 'Enter JSON data please. Press "Default" if you want default toolbox';
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
      resolve(x)
    });

    defaultButton.addEventListener('click', ()=>{
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
      resolve(x)
    })

    cancelButton.addEventListener('click', () => {
      x = null
      dialog.close();
      resolve(x)
    });
        // add the dialog to the page
    document.body.appendChild(dialog);
    
        // open the dialog
    dialog.showModal();
  
  //dialog2.close();
  });
};**/

//createJsonInputBox()
//let x = jsonData;
//export { x };

//x = jsonData;

/**let x = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'CATEGORY',
      colour: '330',
      custom: 'VARIABLE',
      name: 'Variables'
    }
]
}**/

//export {x};
