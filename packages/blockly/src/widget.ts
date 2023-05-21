import {
  DocumentRegistry,
  DocumentWidget,
  DocumentModel
} from '@jupyterlab/docregistry';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { notebookIcon } from '@jupyterlab/ui-components';

import { SplitPanel } from '@lumino/widgets';
import { Signal } from '@lumino/signaling';

import type Blockly from 'blockly';
//import { INotebookTracker } from '@jupyterlab/notebook';
import { BlocklyLayout } from './layout';
import { BlocklyManager } from './manager';
import {
  BlocklyButton,
  SelectGenerator,
  SelectToolbox,
  Spacer
} from './toolbar';
import { CodeCell } from '@jupyterlab/cells';
import { ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { defaultToolbox } from './utils';
//import { ToolboxItem } from 'blockly';
//import notebookTracker from 'jupyterlab-blockly-extension'
//import { BlocklyRegistry } from './registry';
//import tracenotebook from 'jupyterlab-blockly-extension'

/**
 * DocumentWidget: widget that represents the view or editor for a file type.
 */
export let s: string;
export function customexecute(options: any): ToolboxDefinition {
  let userInput: ToolboxDefinition | null = null;
  const dialog2 = document.createElement('dialog');
  dialog2.style.backgroundColor = '#597ED5';
  dialog2.style.borderRadius = '10px';
  dialog2.style.position = 'fixed';
  dialog2.style.top = '50%';
  dialog2.style.left = '50%';
  dialog2.style.transform = 'translate(-50%, -50%)';
  dialog2.style.padding = '20px';
  dialog2.style.zIndex = '9999';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.style.backgroundColor = 'grey';
  submitButton.style.borderRadius = '5px';
  submitButton.style.border = 'none';
  submitButton.style.color = 'white';
  submitButton.style.padding = '10px';
  submitButton.style.cursor = 'pointer';
  submitButton.style.marginTop = '10px';

  const title2 = document.createElement('h1');
  title2.textContent =
    'Excellent! Now please choose the specifics of your toolbox.';
  title2.style.fontSize = '20px';
  title2.style.marginBottom = '10px';
  title2.style.textAlign = 'center';
  title2.style.color = 'white';

  const nameLabel = document.createElement('label');
  nameLabel.innerText = 'Create the name of the toolbox here:';
  nameLabel.style.color = 'white';
  nameLabel.setAttribute('for', 'nameInput');

  const nameInput = document.createElement('textarea');
  nameInput.style.width = '60%';
  nameInput.style.height = '25px';
  nameInput.style.borderRadius = '10px';
  nameInput.style.padding = '5px';
  nameInput.style.margin = 'auto';

  const colorLabel = document.createElement('label');
  colorLabel.innerText = 'Choose the desired color of the toolbox:';
  colorLabel.style.color = 'white';
  colorLabel.setAttribute('for', 'colorInput');

  const colorInput = document.createElement('input');
  colorInput.id = 'colorInput';
  colorInput.type = 'color';
  colorInput.style.width = '60%';
  colorInput.style.height = '25px';
  colorInput.style.borderRadius = '10px';
  colorInput.style.padding = '5px';
  colorInput.style.margin = 'auto';

  let customresult = '';

  const choiceLabel = document.createElement('label');
  choiceLabel.innerText = 'Choose either "Variable" or "Procedure":';
  choiceLabel.style.color = 'white';

  const variableButton = document.createElement('button');
  variableButton.textContent = 'Variable';
  variableButton.style.marginRight = '10px';
  variableButton.addEventListener(
    'click',
    handleChoiceClick.bind(null, 'variable')
  );

  const procedureButton = document.createElement('button');
  procedureButton.textContent = 'Procedure';
  procedureButton.addEventListener(
    'click',
    handleChoiceClick.bind(null, 'procedure')
  );

  function handleChoiceClick(choice: string): void {
    const selectedButton =
      choice === 'variable' ? variableButton : procedureButton;

    selectedButton.style.transform = 'translateX(100%)';
    selectedButton.style.transition = 'transform 0.5s';

    //unselectedButton.style.transform = 'translateX(0)';
    //unselectedButton.style.transition = 'transform 0.5s';

    if (choice === 'variable') {
      customresult = 'VARIABLE';
    } else {
      customresult = 'PROCEDURE';
    }
  }

  dialog2.appendChild(title2);

  dialog2.appendChild(nameLabel);
  dialog2.appendChild(nameInput);

  dialog2.appendChild(colorLabel);
  dialog2.appendChild(colorInput);

  dialog2.appendChild(choiceLabel);
  dialog2.appendChild(variableButton);
  dialog2.appendChild(procedureButton);
  //dialog2.appendChild(choiceResult);

  dialog2.appendChild(submitButton);

  submitButton.addEventListener('click', () => {
    try {
      const inputString = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'CATEGORY',
            colour: colorInput.value,
            custom: customresult,
            name: nameInput.value
          }
        ]
      };

      userInput = inputString;
      options.manager.registerToolbox('default', userInput);
      dialog2.close();
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });

  document.body.appendChild(dialog2);
  dialog2.showModal();

  return userInput;
}
export class BlocklyEditor extends DocumentWidget<BlocklyPanel, DocumentModel> {
  constructor(options: BlocklyEditor.IOptions) {
    super(options);
    // Loading the ITranslator

    // Create and add a button to the toolbar to execute
    // the code.
    const button = new BlocklyButton({
      label: '',
      icon: notebookIcon,
      className: 'jp-blockly-runButton',
      onClick: () => {
        s = (this.content.layout as BlocklyLayout).run();
        // @ts-expect-error Since its not found for some reason
        window.transferCallback?.(s);
      },
      tooltip: 'Blocks to Code'
    });

    const insertbutton = new BlocklyButton({
      label: 'Insert Toolbox',
      onClick() {
        new Promise<ToolboxDefinition>(resolve => {
          let userInput: ToolboxDefinition | null = null;
          const dialog = document.createElement('dialog');
          dialog.style.backgroundColor = '#597ED5';
          dialog.style.borderRadius = '10px';
          dialog.style.position = 'fixed';
          dialog.style.top = '50%';
          dialog.style.left = '50%';
          dialog.style.transform = 'translate(-50%, -50%)';
          dialog.style.padding = '20px';
          dialog.style.zIndex = '9999';

          const title = document.createElement('h1');
          title.textContent =
            'Welcome!\nHow would you like to create your toolbox?';
          title.style.fontSize = '20px';
          title.style.marginBottom = '10px';
          title.style.textAlign = 'center';
          title.style.color = 'white';

          dialog.appendChild(title);

          const customizeButton = document.createElement('button');
          customizeButton.textContent = 'Customize';
          customizeButton.style.backgroundColor = '#4CAF50';
          customizeButton.style.borderRadius = '5px';
          customizeButton.style.border = 'none';
          customizeButton.style.color = 'white';
          customizeButton.style.padding = '10px';
          customizeButton.style.cursor = 'pointer';
          customizeButton.style.marginTop = '10px';

          dialog.appendChild(customizeButton);

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

          dialog.appendChild(defaultButton);

          const cancelButton = document.createElement('button');
          cancelButton.textContent = 'Cancel';
          cancelButton.style.backgroundColor = '#DF4D4D';
          cancelButton.style.borderRadius = '5px';
          cancelButton.style.border = 'none';
          cancelButton.style.color = 'white';
          cancelButton.style.padding = '10px';
          cancelButton.style.cursor = 'pointer';
          cancelButton.style.marginLeft = '5px';
          cancelButton.style.marginTop = '10px';

          dialog.appendChild(cancelButton);

          customizeButton.addEventListener('click', () => {
            dialog.close();
            const userInput2 = customexecute(options);
            resolve(userInput2);
          });

          defaultButton.addEventListener('click', () => {
            userInput = defaultToolbox;
            console.log('registery.registerToolbox', userInput);
            options.manager.registerToolbox('default', userInput);
            dialog.close();
            resolve(defaultToolbox);
          });

          cancelButton.addEventListener('click', () => {
            dialog.close();
            resolve(userInput);
          });

          document.body.appendChild(dialog);
          dialog.showModal();
        });
      }
      //,tooltip: 'Insert Toolbox'
    });

    this.toolbar.addItem('run', button);
    this.toolbar.addItem('Insert', insertbutton);
    this.toolbar.addItem('spacer', new Spacer());
    this.toolbar.addItem(
      'toolbox',
      new SelectToolbox({
        label: 'Toolbox',
        tooltip: 'Select tollbox',
        manager: options.manager
      })
    );
    this.toolbar.addItem(
      'generator',
      new SelectGenerator({
        label: 'Kernel',
        tooltip: 'Select kernel',
        manager: options.manager
      })
    );
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    this.content.dispose();
    super.dispose();
  }
}

export namespace BlocklyEditor {
  export interface IOptions
    extends DocumentWidget.IOptions<BlocklyPanel, DocumentModel> {
    manager: BlocklyManager;
  }
}

/**
 * Widget that contains the main view of the DocumentWidget.
 */
export class BlocklyPanel extends SplitPanel {
  private _context: DocumentRegistry.IContext<DocumentModel>;
  private _rendermime: IRenderMimeRegistry;

  /**
   * Construct a `BlocklyPanel`.
   *
   * @param context - The documents context.
   */
  constructor(
    context: DocumentRegistry.IContext<DocumentModel>,
    manager: BlocklyManager,
    rendermime: IRenderMimeRegistry
  ) {
    super({
      layout: new BlocklyLayout(manager, context.sessionContext, rendermime)
    });
    this.addClass('jp-BlocklyPanel');
    this._context = context;
    this._rendermime = rendermime;

    // Load the content of the file when the context is ready
    this._context.ready.then(() => this._load());
    // Connect to the save signal
    this._context.saveState.connect(this._onSave, this);
  }

  /*
   * The code cell.
   */
  get cell(): CodeCell {
    return (this.layout as BlocklyLayout).cell;
  }

  /*
   * The rendermime instance used in the code cell.
   */
  get rendermime(): IRenderMimeRegistry {
    return this._rendermime;
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    Signal.clearData(this);
    super.dispose();
  }

  private _load(): void {
    // Loading the content of the document into the workspace
    const content = this._context.model.toJSON() as any as Blockly.Workspace;
    (this.layout as BlocklyLayout).workspace = content;
  }

  private _onSave(
    sender: DocumentRegistry.IContext<DocumentModel>,
    state: DocumentRegistry.SaveState
  ): void {
    if (state === 'started') {
      const workspace = (this.layout as BlocklyLayout).workspace;
      this._context.model.fromJSON(workspace as any);
    }
  }
}
