import { INotebookTracker } from '@jupyterlab/notebook';
import { CodeCell } from '@jupyterlab/cells';

/**export const test = new Promise<string>(resolve => {
  const dialog = document.createElement('dialog');
  dialog.style.backgroundColor = '#597ED5';
  dialog.style.borderRadius = '10px';
  //dialog.style.boxShadow = '#7CD8FF';
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.padding = '20px';
  dialog.style.zIndex = '9999';

  const submitButton = document.createElement('button');
  submitButton.textContent = code;
  submitButton.style.backgroundColor = '#4CAF50';
  submitButton.style.borderRadius = '5px';
  submitButton.style.border = 'none';
  submitButton.style.color = 'white';
  submitButton.style.padding = '10px';
  submitButton.style.cursor = 'pointer';
  submitButton.style.marginTop = '10px';

  dialog.appendChild(submitButton);

  submitButton.addEventListener('click', () => {
    const inputString = code;
    //userInput = eval(`(${inputString})`);
    //see(userInput);

    dialog.close();
    resolve(inputString);
  });
  document.body.appendChild(dialog);
  dialog.showModal();
});**/

export function tracenotebook(notebookTracker: INotebookTracker, code: string) {
  // Get the currently active notebook panel

  const notePanel = notebookTracker.currentWidget;

  // Get the currently active code cell
  const activeCell = notePanel?.content.activeCell as CodeCell;

  // Set the code in the active cell
  if (activeCell) {
    activeCell.model.value.text = code;
  } else {
    console.log('No active cell found');
  }

  // Listen for changes to the active cell
  notebookTracker.activeCellChanged.connect((tracker, cell) => {
    console.log('Active cell changed:', cell);

    if (cell instanceof CodeCell) {
      // Set the code in the new active cell
      cell.model.value.text = code;
    } else {
      console.log('No active cell found');
    }
  });
  //test;
}
