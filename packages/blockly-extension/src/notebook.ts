import { INotebookTracker } from '@jupyterlab/notebook';
import { CodeCell } from '@jupyterlab/cells';

export function tracenotebook(notebookTracker: INotebookTracker) {
  // Get the currently active notebook panel
  const notePanel = notebookTracker.currentWidget;

  // Get the currently active code cell
  const activeCell = notePanel?.content.activeCell as CodeCell;

  // Set the code in the active cell
  if (activeCell) {
    activeCell.model.value.text = "print('Hello, world!')";
  } else {
    console.log('No active cell found');
  }

  // Listen for changes to the active cell
  notebookTracker.activeCellChanged.connect((tracker, cell) => {
    console.log('Active cell changed:', cell);

    if (cell instanceof CodeCell) {
      // Set the code in the new active cell
      cell.model.value.text = "print('Hello, world!')";
    } else {
      console.log('No active cell found');
    }
  });
}

/**const dialog = document.createElement('dialog');
  dialog.style.backgroundColor = '#597ED5';
  dialog.style.borderRadius = '10px';
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.padding = '20px';
  dialog.style.zIndex = '9999';
  document.body.appendChild(dialog);
  dialog.showModal();**/
